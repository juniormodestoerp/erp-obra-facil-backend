import { FastifyCorsOptions } from '@fastify/cors'

export default {
  credentials: true,
  allowedHeaders: ['content-type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
} as FastifyCorsOptions
