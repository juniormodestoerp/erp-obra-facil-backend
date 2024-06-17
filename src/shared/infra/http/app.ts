import { join } from 'node:path'
import cookies from '@fastify/cookie'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import fastify from 'fastify'
import fastifyStatic from '@fastify/static'

import CorsConfig from '@shared/infra/config/cors'
import HelmetConfig from '@shared/infra/config/helmet'
import {
	JwtAccessTokenConfig,
	JwtRefreshTokenConfig,
} from '@shared/infra/config/jwt'
import { SwaggerConfig, SwaggerUIConfig } from '@shared/infra/config/swagger'
import { errorHandler } from '@shared/infra/http/error-handler'
import { AppRoutes } from '@shared/infra/http/routes'

export const app = fastify()

app.register(cors, CorsConfig)
app.register(cookies)
app.register(helmet, HelmetConfig)
app.register(swagger, SwaggerConfig)
app.register(swaggerUI, SwaggerUIConfig)
app.register(jwt, JwtAccessTokenConfig)
app.register(jwt, JwtRefreshTokenConfig)
app.register(multipart)
app.register(fastifyStatic, {
	root: join(__dirname, '..', '..', '..', 'uploads'),
	prefix: '/uploads/',
  setHeaders: (res, path, stat) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
})

// http://localhost:8080/uploads/profile-pictures/bruno-vilefort-fdb8f2f0-ab61-4f36-9372-e7a09eaa10ab.jpeg

app.register(AppRoutes, { prefix: 'api/v1' })

app.setErrorHandler(errorHandler)
