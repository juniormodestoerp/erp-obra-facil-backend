import fastify from 'fastify'
import cookies from '@fastify/cookie'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import jwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import multer from 'fastify-multer'

import HelmetConfig from '@shared/infra/config/helmet'
import CorsConfig from '@shared/infra/config/cors'
import {
  JwtAccessTokenConfig,
  JwtRefreshTokenConfig,
} from '@shared/infra/config/jwt'
import { SwaggerConfig, SwaggerUIConfig } from '@shared/infra/config/swagger'
import { AppRoutes } from '@shared/infra/http/routes'
import { errorHandler } from '@shared/infra/http/error-handler'

export const app = fastify()

app.register(cors, CorsConfig)
app.register(cookies)
app.register(helmet, HelmetConfig)
app.register(swagger, SwaggerConfig)
app.register(swaggerUI, SwaggerUIConfig)
app.register(jwt, JwtAccessTokenConfig)
app.register(jwt, JwtRefreshTokenConfig)
app.register(multer.contentParser)
app.register(AppRoutes, { prefix: 'api/v1' })

app.setErrorHandler(errorHandler)
