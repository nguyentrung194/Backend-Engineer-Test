import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class AuthUserLoginDto {
  @ApiProperty({ example: 'admin@example.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'secret' })
  @IsNotEmpty()
  password: string;
}
