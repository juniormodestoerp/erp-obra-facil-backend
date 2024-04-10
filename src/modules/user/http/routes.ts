import { FastifyInstance } from 'fastify'

import { register } from '@modules/user/http/controllers/register'
import { authenticate } from '@modules/user/http/controllers/authenticate'
import { refresh } from '@modules/user/http/controllers/refresh'
import { sendForgotPasswordCode } from '@modules/user/http/controllers/send-forgot-password-code'
import { resetForgotPassword } from '@modules/user/http/controllers/reset-forgot-password'
import { profile } from '@modules/user/http/controllers/profile'
import { uploadPicture } from '@modules/user/http/controllers/upload-picture'
import { dowloadPicture } from '@modules/user/http/controllers/dowload-picture'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
  app.post('/sessions', authenticate)
  app.get('/token/refresh', refresh)
  app.post('/users', register)
  app.post('/password/forgot', sendForgotPasswordCode)
  app.post('/password/reset', resetForgotPassword)

  app.get('/users/profile', { onRequest: [verifyJwt] }, profile)
  app.get('/uploads/picture/:id', dowloadPicture) // { onRequest: [verifyJwt] }
  app.post('/uploads/picture', uploadPicture) // { onRequest: [verifyJwt] }
}
