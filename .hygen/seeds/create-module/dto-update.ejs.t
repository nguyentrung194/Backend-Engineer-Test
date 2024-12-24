---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/update-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto.ts
---
import { IsNotEmpty, IsString } from 'class-validator';

export class Update<%= h.inflection.transform(name, ['underscore', 'camelize']) %>Dto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
