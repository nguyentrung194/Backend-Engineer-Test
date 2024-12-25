import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { RedirectController } from './redirect.controller';
import { BlacklistsModule } from 'src/blacklists/blacklists.module';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), BlacklistsModule],
  controllers: [UrlsController, RedirectController],
  providers: [IsExist, IsNotExist, UrlsService],
  exports: [UrlsService],
})
export class UrlsModule {}
