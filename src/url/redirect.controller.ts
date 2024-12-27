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

  @Get(':shortCode')
  @Redirect()
  async redirect(@Param('shortCode') shortCode: string) {
    const urlData = await this.urlsService.findByShortCode(shortCode);
    if (!urlData) {
      throw new NotFoundException('URL not found');
    }

    if (
      (urlData.expiresAt && urlData.expiresAt < new Date()) ||
      // admin can update the url to be inactive
      !urlData.isActive ||
      // if the url is soft deleted
      (urlData.deletedAt && urlData.deletedAt < new Date())
    ) {
      throw new GoneException('URL has expired');
    }
    // update hit counter
    void this.urlsService.updateHitCounter(urlData.id);

    return { url: urlData.originalUrl };
  }
}
