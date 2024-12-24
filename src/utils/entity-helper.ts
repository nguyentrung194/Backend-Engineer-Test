import { instanceToPlain } from 'class-transformer';
import { TypeORMColType } from 'src/utils/constants/typeorm.const';
import {
  AfterLoad,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Allow } from 'class-validator';

export abstract class CustomBaseEntity extends BaseEntity {
  __entity?: string;
  @Allow()
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: TypeORMColType.TIMESTAMP,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: TypeORMColType.TIMESTAMP,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: TypeORMColType.TIMESTAMP,
  })
  deletedAt: Date;

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
