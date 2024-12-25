import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';
import { Url } from './entities/url.entity';
import { NullableType } from '../utils/types/nullable.type';
import { PaginationResultType } from '../utils/types/pagination-result.type';
import {
  parseToQueryPagination,
  responseWithPagination,
} from '../utils/pagination';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Url)
    private urlsRepository: Repository<Url>,
    private configService: ConfigService<AllConfigType>,
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
    return this.findOne({ shortCode });
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<PaginationResultType<Url>> {
    return responseWithPagination(
      await this.urlsRepository.findAndCount(
        parseToQueryPagination(paginationOptions),
      ),
      paginationOptions,
    );
  }

  findOne(fields: EntityCondition<Url>): Promise<NullableType<Url>> {
    return this.urlsRepository.findOne({
      where: fields,
    });
  }

  update(id: Url['id'], payload: DeepPartial<Url>): Promise<Url> {
    return this.urlsRepository.save(
      this.urlsRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: Url['id']): Promise<void> {
    await this.urlsRepository.softDelete(id);
  }

  async updateHitCounter(id: number): Promise<void> {
    await this.urlsRepository.increment({ id }, 'hits', 1);
  }
}
