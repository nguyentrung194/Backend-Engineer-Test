---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.module.ts
---
import { Module } from '@nestjs/common';
import { <%= h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']) %>Service } from './<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service';
import { <%= h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']) %>Controller } from './<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { <%= h.inflection.transform(name, ['underscore', 'camelize']) %> } from './entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([<%= h.inflection.transform(name, ['underscore', 'camelize']) %>])],
  controllers: [<%= h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']) %>Controller],
  providers: [IsExist, IsNotExist, <%= h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']) %>Service],
  exports: [<%= h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']) %>Service],
})
export class <%= h.inflection.transform(name, ['pluralize', 'underscore', 'camelize']) %>Module {}
