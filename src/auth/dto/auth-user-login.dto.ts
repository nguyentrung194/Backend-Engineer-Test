import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
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
