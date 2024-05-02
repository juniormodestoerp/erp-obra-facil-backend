import { FastifyInstance } from 'fastify'

import { authenticate } from '@modules/users/http/controllers/authenticate'

import { profile } from '@modules/users/http/controllers/profile'

import { register } from '@modules/users/http/controllers/register'

import { refresh } from '@modules/users/http/controllers/refresh'

import { resetForgotPassword } from '@modules/users/http/controllers/reset-forgot-password'

import { sendForgotPasswordCode } from '@modules/users/http/controllers/send-forgot-password-code'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
  app.post('/sessions', authenticate)
  app.get('/token/refresh', refresh)
  app.post('/users', register)
  app.post('/password/forgot', sendForgotPasswordCode)
  app.post('/password/reset', resetForgotPassword)
  app.get('/users/profile', { onRequest: [verifyJwt] }, profile)
}
