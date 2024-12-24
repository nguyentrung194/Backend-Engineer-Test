import { Entity, Index, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CustomBaseEntity } from 'src/utils/entity-helper';

@Entity()
export class Session extends CustomBaseEntity {
  @ManyToOne(() => User, {
    eager: true,
  })
  @Index()
  user: User;
}
