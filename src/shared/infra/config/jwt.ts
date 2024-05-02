import { FastifyJWTOptions } from '@fastify/jwt'

import { env } from '@shared/infra/config/env'

export default {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'accessToken',
    signed: false,
  },
} as FastifyJWTOptions
