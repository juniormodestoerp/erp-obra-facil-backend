import { env } from '@shared/infra/config/env'
import { FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui'

export const SwaggerConfig = {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: env.APP_NAME,
      description: env.APP_DESCRIPTION,
      version: '1.0.0',
    },
  },
} as FastifyDynamicSwaggerOptions

export const SwaggerUIConfig = {
  routePrefix: '/docs',
} as FastifySwaggerUiOptions
