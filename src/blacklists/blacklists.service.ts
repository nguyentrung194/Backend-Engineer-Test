import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blacklist } from './entities/blacklist.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateBlacklistDto } from 'src/blacklists/dto/create-blacklist.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { PaginationResultType } from 'src/utils/types/pagination-result.type';
import {
  parseToQueryPagination,
  responseWithPagination,
} from 'src/utils/pagination';
import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class BlacklistsService {
  constructor(
    @InjectRepository(Blacklist)
    private blacklistsRepository: Repository<Blacklist>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  create(createBlacklistDto: CreateBlacklistDto): Promise<Blacklist> {
    return this.blacklistsRepository.save(
      this.blacklistsRepository.create(createBlacklistDto),
    );
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<PaginationResultType<Blacklist>> {
    return responseWithPagination(
      await this.blacklistsRepository.findAndCount(
        parseToQueryPagination(paginationOptions),
      ),
      paginationOptions,
    );
  }

  findOne(
    fields: EntityCondition<Blacklist>,
  ): Promise<NullableType<Blacklist>> {
    return this.blacklistsRepository.findOne({
      where: fields,
    });
  }

  update(
    id: Blacklist['id'],
    payload: DeepPartial<Blacklist>,
  ): Promise<Blacklist> {
    return this.blacklistsRepository.save(
      this.blacklistsRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: Blacklist['id']): Promise<void> {
    await this.blacklistsRepository.softDelete(id);
  }

  // get all regex patterns
  async getAllRegexPatterns(): Promise<string[]> {
    const cacheKey = 'blacklist_regex_patterns';
    const cachedPatterns = await this.cacheManager.get<string[]>(cacheKey);

    if (cachedPatterns) {
      return cachedPatterns;
    }

    const blacklists = await this.blacklistsRepository.find();
    const patterns = blacklists.map((blacklist) => blacklist.regex_pattern);

    await this.cacheManager.set(cacheKey, patterns, 30 * 60 * 1000); // Cache for 30 minutes
    return patterns;
  }
}
