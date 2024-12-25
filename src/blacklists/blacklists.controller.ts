import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  DefaultValuePipe,
  ParseIntPipe,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlacklistsService } from './blacklists.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { Blacklist } from './entities/blacklist.entity';
import { PaginationResultType } from 'src/utils/types/pagination-result.type';
import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { NullableType } from 'src/utils/types/nullable.type';
import { UpdateBlacklistDto } from './dto/update-blacklist.dto';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Blacklists')
@Controller({
  path: 'blacklists',
  version: '1',
})
export class BlacklistsController {
  constructor(private readonly blacklistsService: BlacklistsService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBlacklistDto: CreateBlacklistDto): Promise<Blacklist> {
    return this.blacklistsService.create(createBlacklistDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Blacklist>> {
    return this.blacklistsService.findOne({ id: +id });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginationResultType<Blacklist>> {
    return this.blacklistsService.findManyWithPagination({ page, limit });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateBlacklistDto: UpdateBlacklistDto,
  ): Promise<Blacklist> {
    return this.blacklistsService.update(id, updateBlacklistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.blacklistsService.softDelete(id);
  }
}
