import fastify from 'fastify'
import cookies from '@fastify/cookie'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import CorsConfig from '@shared/infra/config/cors'
import JwtConfig from '@shared/infra/config/jwt'
import { SwaggerConfig, SwaggerUIConfig } from '@shared/infra/config/swagger'
import { AppRoutes } from '@shared/infra/http/routes'
import { errorHandler } from '@shared/infra/http/error-handler'

export const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, CorsConfig)
app.register(swagger, SwaggerConfig)
app.register(swaggerUI, SwaggerUIConfig)
app.register(cookies)
app.register(jwt, JwtConfig)
app.register(AppRoutes, { prefix: 'erp' })

app.setErrorHandler(errorHandler)
