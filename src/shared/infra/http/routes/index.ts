/* eslint-disable @typescript-eslint/no-var-requires */
import { FastifyInstance, FastifyRequest } from 'fastify'
import rateLimit from '@fastify/rate-limit'
import Redis from 'ioredis'

import RedisConfig from '@shared/infra/config/redis'
import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'
import { getRoutes } from '@shared/infra/http/routes/get-routes'

export async function AppRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  await app.register(rateLimit, {
    global: true,
    max: 50,
    timeWindow: '1 minute',
    redis: new Redis(RedisConfig.config.redis),
    keyGenerator: (request: FastifyRequest) => {
      const userId = request?.user?.sub
      const requestDate = new Date().toISOString()

      return `${userId}:${requestDate}`
    },
  })

  const routes = await getRoutes()

  if (routes === null || routes === undefined) {
    return undefined
  }

  for (const route of routes) {
    const routeFile = require(route)
    if (typeof routeFile === 'object') {
      app.register(routeFile.default)
    }
  }
}
