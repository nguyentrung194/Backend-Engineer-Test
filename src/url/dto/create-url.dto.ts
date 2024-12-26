import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  @IsNotEmpty()
  originalUrl: string;

  @IsOptional()
  expiresAt?: Date;
}
