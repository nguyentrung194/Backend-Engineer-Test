import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBlacklistDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The regex pattern to match against the URL',
    example: 'https://*.example.com',
  })
  regex_pattern: string;
}
