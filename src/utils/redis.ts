import { RedisConfig } from '../config/config.type';

export function getConnectionUrl(redisConfig: RedisConfig): string {
  const { redisHost, redisPort, redisUser, redisPass, redisDB } = redisConfig;

  if (redisUser && redisPass) {
    return `redis://${redisUser}:${redisPass}@${redisHost}:${redisPort}/${redisDB}`;
  }

  if (redisPass) {
    return `redis://${redisPass}@${redisHost}:${redisPort}/${redisDB}`;
  }

  return `redis://${redisHost}:${redisPort}/${redisDB}`;
}
