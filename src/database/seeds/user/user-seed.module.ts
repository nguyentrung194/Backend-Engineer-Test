import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserSeedService } from './user-seed.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserSeedService, UsersService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
