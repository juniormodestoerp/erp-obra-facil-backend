import { FastifyInstance } from 'fastify'

import { register } from '@modules/user/http/controllers/register'
import { authenticate } from '@modules/user/http/controllers/authenticate'
import { refresh } from '@modules/user/http/controllers/refresh'
import { sendForgotPasswordCode } from '@modules/user/http/controllers/send-forgot-password-code'
import { forgotPassword } from '@modules/user/http/controllers/forgot-password'
import { profile } from '@modules/user/http/controllers/profile'

// import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
  app.post('/sessions', authenticate)
  app.get('/token/refresh', refresh)
  app.post('/users', register)
  app.post('/password/forgot', forgotPassword)
  app.post('/password/reset', sendForgotPasswordCode)

  app.get('/users/profile', profile) // , { onRequest: [verifyJwt] }
}
