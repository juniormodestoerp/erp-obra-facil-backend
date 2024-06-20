import { join } from 'node:path'
import cookies from '@fastify/cookie'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import fastify from 'fastify'

import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'
import { makeShowUserProfileUseCase } from '@modules/users/use-cases/factories/make-show-user-profile-factory'
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
	setHeaders: (res) => {
		res.setHeader('Access-Control-Allow-Origin', '*')
	},
})

app.register(AppRoutes, { prefix: 'api/v1' })

app.setErrorHandler(errorHandler)
