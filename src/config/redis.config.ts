import { registerAs } from '@nestjs/config';
import { RedisConfig } from './config.type';
import { IsInt, IsOptional, IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  REDIS_HOST: string;

  @IsInt()
  REDIS_PORT: number;

  @IsString()
  @IsOptional()
  REDIS_USER: string;

  @IsString()
  @IsOptional()
  REDIS_PASS: string;

  @IsInt()
  REDIS_DB: number;
}

export default registerAs<RedisConfig>('redis', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT
      ? parseInt(process.env.REDIS_PORT, 10)
      : 6379,
    redisUser: process.env.REDIS_USER,
    redisPass: process.env.REDIS_PASS,
    redisDB: process.env.REDIS_DB ? parseInt(process.env.REDIS_DB, 10) : 0,
  };
});
