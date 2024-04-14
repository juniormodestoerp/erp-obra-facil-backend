import { FastifyJWTOptions } from '@fastify/jwt'
import { env } from '@shared/infra/config/env'

export default {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
} as FastifyJWTOptions
