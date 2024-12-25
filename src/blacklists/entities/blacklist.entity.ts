import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from 'src/utils/entity-helper';

@Entity()
export class Blacklist extends CustomBaseEntity {
  @Column({ type: String, nullable: false })
  regex_pattern: string;
}
