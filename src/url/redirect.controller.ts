import {
  Controller,
  Get,
  Param,
  Redirect,
  NotFoundException,
  GoneException,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';

@ApiTags('URL Redirects')
@Controller({
  path: 'r', // Short path for redirects
})
export class RedirectController {
  constructor(private readonly urlsService: UrlsService) {}

  // unauthenticated api to create a short url
  @Post()
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlsService.create(createUrlDto);
  }

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
    // update hit counter
    void this.urlsService.updateHitCounter(url.id);

    return { url: url.originalUrl };
  }
}
