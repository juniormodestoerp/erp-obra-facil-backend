import { FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

export const SwaggerConfig = {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'Event Management API',
      description: 'API for managing events and attendees',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
} as FastifyDynamicSwaggerOptions

export const SwaggerUIConfig = {
  routePrefix: '/docs',
} as FastifySwaggerUiOptions
