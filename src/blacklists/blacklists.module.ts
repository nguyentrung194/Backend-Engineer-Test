import { Module } from '@nestjs/common';
import { BlacklistsService } from './blacklists.service';
import { BlacklistsController } from './blacklists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blacklist } from './entities/blacklist.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Blacklist])],
  controllers: [BlacklistsController],
  providers: [IsExist, IsNotExist, BlacklistsService],
  exports: [BlacklistsService],
})
export class BlacklistsModule {}
