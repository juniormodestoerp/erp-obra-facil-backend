import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { authenticate } from '@modules/user/http/controllers/authenticate'
import { authenticateSchema } from '@modules/user/http/schemas/autenticate'

import { profile } from '@modules/user/http/controllers/profile'
import { profileSchema } from '@modules/user/http/schemas/profile'

import { register } from '@modules/user/http/controllers/register'
import { registerSchema } from '@modules/user/http/schemas/register'

import { refresh } from '@modules/user/http/controllers/refresh'
import { refreshSchema } from '@modules/user/http/schemas/refresh'

import { resetForgotPassword } from '@modules/user/http/controllers/reset-forgot-password'
import { resetForgotPasswordSchema } from '@modules/user/http/schemas/reset-forgot-password'

import { sendForgotPasswordCode } from '@modules/user/http/controllers/send-forgot-password-code'
import { sendForgotPasswordCodeSchema } from '@modules/user/http/schemas/send-forgot-password-code'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/sessions', authenticateSchema, authenticate)
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/token/refresh', refreshSchema, refresh)
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/users', registerSchema, register)
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/password/forgot',
      sendForgotPasswordCodeSchema,
      sendForgotPasswordCode,
    )
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/password/reset', resetForgotPasswordSchema, resetForgotPassword)

  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/profile',
    {
      onRequest: [verifyJwt],
      schema: profileSchema.schema,
    },
    profile,
  )
}
