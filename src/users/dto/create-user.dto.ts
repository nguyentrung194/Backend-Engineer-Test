import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { Status } from 'src/statuses/entities/status.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string | null;

  @ApiProperty({ example: 'operator' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'usernameAlreadyExists',
  })
  @IsString()
  username: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({ type: Role })
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null;

  @ApiProperty({ type: Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;
}
