import { RedisOptions } from 'ioredis'

import { env } from '@shared/infra/config/env'

interface ICacheConfig {
  driver: 'redis'
  config: {
    redis: RedisOptions
  }
}

export default {
  driver: 'redis',
  config: {
    redis: {
      port: env.REDIS_PORT,
      host: env.REDIS_HOST,
      family: 4,
      password: env.REDIS_PASS || undefined,
      db: 0,
    },
  },
} as ICacheConfig
