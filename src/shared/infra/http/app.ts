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

import CorsConfig from '@shared/infra/config/cors'
import HelmetConfig from '@shared/infra/config/helmet'
import {
	JwtAccessTokenConfig,
	JwtRefreshTokenConfig,
} from '@shared/infra/config/jwt'
import { SwaggerConfig, SwaggerUIConfig } from '@shared/infra/config/swagger'
import { errorHandler } from '@shared/infra/http/error-handler'
// import { AppRoutes } from '@shared/infra/http/routes'

import { AddressRouter } from '@modules/addresses/http/routes'
import { AccountsRouter } from '@modules/accounts/http/routes'
import { CategoriesRouter } from '@modules/categories/http/routes'
import { CentersRouter } from '@modules/centers/http/routes'
import { ConciliationsRouter } from '@modules/conciliations/http/routes'
import { MethodRouter } from '@modules/methods/http/routes'
import { MetricsRouter } from '@modules/metrics/http/routes'
import { SettingsRouter } from '@modules/settings/http/routes'
import { TagsRouter } from '@modules/tags/http/routes'
import { TransactionsRouter } from '@modules/transactions/http/routes'
import { UsersRouter } from '@modules/users/http/routes'
import { UtilsRouter } from '@modules/utils/http/routes'

export const app = fastify()

// Registrar plugins globais
app.register(cors, CorsConfig)
app.register(cookies)
app.register(helmet, HelmetConfig)
app.register(jwt, JwtAccessTokenConfig)
app.register(jwt, JwtRefreshTokenConfig)
app.register(multipart)

// Registrar Swagger depois dos plugins
app.register(swagger, SwaggerConfig)
app.register(swaggerUI, SwaggerUIConfig)

// Registrar arquivos estáticos
app.register(fastifyStatic, {
	root: join(__dirname, '..', '..', '..', 'uploads'),
	prefix: '/uploads/',
	setHeaders: (res) => {
		res.setHeader('Access-Control-Allow-Origin', '*')
	},
})

// Registrar o manejador de erros
app.setErrorHandler(errorHandler)

// Registrar rotas com prefixo
// app.register(AppRoutes, { prefix: 'api/v1' })

/**
 * Início rotas
 */
app.register(AddressRouter, { prefix: 'api/v1' })
app.register(AccountsRouter, { prefix: 'api/v1' })
app.register(CategoriesRouter, { prefix: 'api/v1' })
app.register(CentersRouter, { prefix: 'api/v1' })
app.register(ConciliationsRouter, { prefix: 'api/v1' })
app.register(MethodRouter, { prefix: 'api/v1' })
app.register(MetricsRouter, { prefix: 'api/v1' })
app.register(SettingsRouter, { prefix: 'api/v1' })
app.register(TagsRouter, { prefix: 'api/v1' })
app.register(TransactionsRouter, { prefix: 'api/v1' })
app.register(UsersRouter, { prefix: 'api/v1' })
app.register(UtilsRouter, { prefix: 'api/v1' })
/**
 * Fim rotas
 */
