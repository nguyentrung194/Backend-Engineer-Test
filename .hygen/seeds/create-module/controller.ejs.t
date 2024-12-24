---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.controller.ts
---
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  DefaultValuePipe,
  ParseIntPipe,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { <%= h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']) %>Service } from './<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { <%= h.inflection.transform(name, ['underscore', 'camelize']) %> } from './entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.entity';
import { PaginationResultType } from 'src/utils/types/pagination-result.type';
import { Create<%= h.inflection.transform(name, ['underscore', 'camelize']) %>Dto } from './dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
import { NullableType } from 'src/utils/types/nullable.type';
import { Update<%= h.inflection.transform(name, ['underscore', 'camelize']) %>Dto } from './dto/update-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('<%= h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']) %>')
@Controller({
  path: '<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>',
  version: '1',
})
export class <%= h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']) %>Controller {
  constructor(private readonly <%= h.inflection.camelize(h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']), true) %>Service: <%= h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']) %>Service) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() create<%= h.inflection.transform(name, ['underscore', 'camelize']) %>Dto: Create<%= h.inflection.transform(name, ['underscore', 'camelize']) %>Dto): Promise<<%= h.inflection.transform(name, ['underscore', 'camelize']) %>> {
    return this.<%= h.inflection.camelize(h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']), true) %>Service.create(create<%= h.inflection.transform(name, ['underscore', 'camelize']) %>Dto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<<%= h.inflection.transform(name, ['underscore', 'camelize']) %>>> {
    return this.<%= h.inflection.camelize(h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']), true) %>Service.findOne({ id: +id });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginationResultType<<%= h.inflection.transform(name, ['underscore', 'camelize']) %>>> {
    return this.<%= h.inflection.camelize(h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']), true) %>Service.findManyWithPagination({ page, limit });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() update<%= h.inflection.transform(name, ['underscore', 'camelize']) %>Dto: Update<%= h.inflection.transform(name, ['underscore', 'camelize']) %>Dto,
  ): Promise<<%= h.inflection.transform(name, ['underscore', 'camelize']) %>> {
    return this.<%= h.inflection.camelize(h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']), true) %>Service.update(id, update<%= h.inflection.transform(name, ['underscore', 'camelize']) %>Dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.<%= h.inflection.camelize(h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']), true) %>Service.softDelete(id);
  }
}
