---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service.ts
---
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { <%= h.inflection.transform(name, ['underscore', 'camelize']) %> } from './entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Create<%= h.inflection.transform(name, ['underscore', 'camelize']) %>Dto } from 'src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { PaginationResultType } from 'src/utils/types/pagination-result.type';
import {
  parseToQueryPagination,
  responseWithPagination,
} from 'src/utils/pagination';
import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

@Injectable()
export class <%= h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']) %>Service {
  constructor(
    @InjectRepository(<%= h.inflection.transform(name, ['underscore', 'camelize']) %>)
    private <%= h.inflection.camelize(h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']), true) %>Repository: Repository<<%= h.inflection.transform(name, ['underscore', 'camelize']) %>>,
  ) {}

  create(create<%= h.inflection.transform(name, ['underscore', 'camelize']) %>Dto: Create<%= h.inflection.transform(name, ['underscore', 'camelize']) %>Dto): Promise<<%= h.inflection.transform(name, ['underscore', 'camelize']) %>> {
    return this.<%= h.inflection.camelize(h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']), true) %>Repository.save(
      this.<%= h.inflection.camelize(h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']), true) %>Repository.create(create<%= h.inflection.transform(name, ['underscore', 'camelize']) %>Dto),
    );
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<PaginationResultType<<%= h.inflection.transform(name, ['underscore', 'camelize']) %>>> {
    return responseWithPagination(
      await this.<%= h.inflection.camelize(h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']), true) %>Repository.findAndCount(
        parseToQueryPagination(paginationOptions),
      ),
      paginationOptions,
    );
  }

  findOne(
    fields: EntityCondition<<%= h.inflection.transform(name, ['underscore', 'camelize']) %>>,
  ): Promise<NullableType<<%= h.inflection.transform(name, ['underscore', 'camelize']) %>>> {
    return this.<%= h.inflection.camelize(h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']), true) %>Repository.findOne({
      where: fields,
    });
  }

  update(
    id: <%= h.inflection.transform(name, ['underscore', 'camelize']) %>['id'],
    payload: DeepPartial<<%= h.inflection.transform(name, ['underscore', 'camelize']) %>>,
  ): Promise<<%= h.inflection.transform(name, ['underscore', 'camelize']) %>> {
    return this.<%= h.inflection.camelize(h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']), true) %>Repository.save(
      this.<%= h.inflection.camelize(h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']), true) %>Repository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: <%= h.inflection.transform(name, ['underscore', 'camelize']) %>['id']): Promise<void> {
    await this.<%= h.inflection.camelize(h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']), true) %>Repository.softDelete(id);
  }
}
