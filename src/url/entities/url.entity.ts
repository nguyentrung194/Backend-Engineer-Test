import { Column, Entity, Index } from 'typeorm';

import { CustomBaseEntity } from 'src/utils/entity-helper';

@Entity()
export class Url extends CustomBaseEntity {
  @Column()
  @Index() // Add index for faster lookups
  originalUrl: string;

  @Column()
  @Index({ unique: true }) // Add unique index for short codes
  shortCode: string;

  @Column({ nullable: true })
  expiresAt: Date;

  @Column({ default: 0 })
  hits: number;

  @Column({ default: true })
  isActive: boolean; // Add status flag to disable URLs if needed
}
