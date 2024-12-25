import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blacklist } from 'src/blacklists/entities/blacklist.entity';
import { BlacklistSeedService } from './blacklist-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blacklist])],
  providers: [BlacklistSeedService],
  exports: [BlacklistSeedService],
})
export class BlacklistSeedModule {}
