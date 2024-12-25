import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';
import { Url } from './entities/url.entity';
import { NullableType } from '../utils/types/nullable.type';
import { PaginationResultType } from '../utils/types/pagination-result.type';
import { responseWithPagination } from '../utils/pagination';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { BlacklistsService } from 'src/blacklists/blacklists.service';

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Url)
    private urlsRepository: Repository<Url>,
    private configService: ConfigService<AllConfigType>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private blacklistsService: BlacklistsService,
  ) {}

  // Add method to generate short URL code
  private generateShortCode(length: number = 6): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }

  // Modify create method to handle URL shortening
  async create(createUrlDto: CreateUrlDto): Promise<{
    shortUrl: string;
    originalUrl: string;
    expiresAt: Date;
  }> {
    const blacklists = await this.blacklistsService.getAllRegexPatterns();
    if (
      blacklists.some((pattern) => {
        // Convert wildcard pattern to regex pattern
        const regexPattern = pattern
          .replace(/\./g, '\\.') // Escape dots
          .replace(/\*/g, '.*'); // Convert * to .*
        return new RegExp(`^${regexPattern}$`).test(createUrlDto.originalUrl);
      })
    ) {
      throw new BadRequestException('URL is blacklisted');
    }

    let shortCode = this.generateShortCode();

    // Check if shortCode already exists
    let existing = await this.findOne({ shortCode });
    while (existing) {
      shortCode = this.generateShortCode();
      existing = await this.findOne({ shortCode });
    }

    const data = await this.urlsRepository.save(
      this.urlsRepository.create({
        ...createUrlDto,
        shortCode,
      }),
    );

    const url = this.configService.get('app.backendDomain', { infer: true });

    return {
      shortUrl: `${url}/r/${data.shortCode}`,
      originalUrl: data.originalUrl,
      expiresAt: data.expiresAt,
    };
  }

  // Add method to find URL by short code
  async findByShortCode(shortCode: string): Promise<NullableType<Url>> {
    // include soft deleted urls
    const cachedUrl = await this.cacheManager.get(`url:${shortCode}`);
    if (cachedUrl) {
      console.log('cachedUrl', cachedUrl);
      try {
        return JSON.parse(cachedUrl.toString()) as Url;
      } catch (error) {
        console.error('Error parsing cached URL:', error);
      }
    }

    const data = await this.urlsRepository.findOne({
      where: {
        shortCode,
      },
      withDeleted: true, // This will include soft-deleted records
    });

    await this.cacheManager.set(`url:${shortCode}`, JSON.stringify(data));
    return data;
  }

  async findManyWithPagination(
    { shortCode, keyword }: { shortCode?: string; keyword?: string },
    paginationOptions: IPaginationOptions,
  ): Promise<PaginationResultType<Url>> {
    const queryBuilder = this.urlsRepository.createQueryBuilder('url');

    if (shortCode) {
      queryBuilder.andWhere('url.shortCode ILIKE :shortCode', {
        shortCode: `%${shortCode}%`,
      });
    }

    if (keyword) {
      queryBuilder.andWhere('url.originalUrl ILIKE :keyword', {
        keyword: `%${keyword}%`,
      });
    }

    const [items, total] = await queryBuilder
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .getManyAndCount();

    return responseWithPagination([items, total], paginationOptions);
  }

  findOne(fields: EntityCondition<Url>): Promise<NullableType<Url>> {
    return this.urlsRepository.findOne({
      where: fields,
    });
  }

  update(id: Url['id'], payload: DeepPartial<Url>): Promise<Url> {
    // clear cache
    void this.cacheManager.del(`url:${id}`);
    return this.urlsRepository.save(
      this.urlsRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: Url['id']): Promise<void> {
    // clear cache
    void this.cacheManager.del(`url:${id}`);
    await this.urlsRepository.softDelete(id);
  }

  async updateHitCounter(id: number): Promise<void> {
    await this.urlsRepository.increment({ id }, 'hits', 1);
  }
}
