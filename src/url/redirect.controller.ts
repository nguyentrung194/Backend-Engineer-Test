import {
  Controller,
  Get,
  Param,
  Redirect,
  NotFoundException,
  GoneException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UrlsService } from './urls.service';

@ApiTags('URL Redirects')
@Controller({
  path: 'r', // Short path for redirects
  version: '1',
})
export class RedirectController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get(':shortUrl')
  @Redirect()
  async redirect(@Param('shortUrl') shortUrl: string) {
    const url = await this.urlsService.findByShortCode(shortUrl);
    if (!url) {
      throw new NotFoundException('URL not found');
    }

    if (url.expiresAt && url.expiresAt < new Date()) {
      throw new GoneException('URL has expired');
    }

    return { url: url.originalUrl };
  }
}
