import type { FastifyCorsOptions } from '@fastify/cors'

export default {
	origin: ['http://localhost:3000', 'http://localhost:3001'],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
} as FastifyCorsOptions
