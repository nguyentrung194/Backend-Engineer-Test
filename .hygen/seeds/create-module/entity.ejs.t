---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.entity.ts
---
import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from 'src/utils/entity-helper';

@Entity()
export class <%= h.inflection.transform(name, ['underscore', 'camelize']) %> extends CustomBaseEntity {
  @Column({ type: String, nullable: false })
  name: string;
}
