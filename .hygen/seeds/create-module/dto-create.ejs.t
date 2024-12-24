---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto.ts
---
import { IsNotEmpty, IsString } from 'class-validator';

export class Create<%= h.inflection.transform(name, ['underscore', 'camelize']) %>Dto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
