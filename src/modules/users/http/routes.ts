import { FastifyInstance } from 'fastify'

import { authGuardController } from '@modules/users/http/controllers/auth-guard-controller'
import { authenticateUserController } from '@modules/users/http/controllers/authenticate-user-controller'
import { logoutUserController } from '@modules/users/http/controllers/logout-user-controller'
import { removeUserController } from '@modules/users/http/controllers/remove-user-controller'
import { resetForgotPasswordController } from '@modules/users/http/controllers/reset-forgot-password-controller'
import { saveUserController } from '@modules/users/http/controllers/save-user-controller'
import { sendForgotPasswordCodeController } from '@modules/users/http/controllers/send-forgot-password-code-controller'
import { showUserProfileController } from '@modules/users/http/controllers/show-user-profile-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
  app.get('/auth-guard', { onRequest: [verifyJwt] }, authGuardController)
  app.get(
    '/users/profile',
    { onRequest: [verifyJwt] },
    showUserProfileController,
  )

  app.post('/sessions', authenticateUserController)

  app.post('/sessions/logout', logoutUserController)

  app.post('/password/reset', resetForgotPasswordController)

  app.post('/password/forgot', sendForgotPasswordCodeController)

  app.put('/users/:id', saveUserController)

  app.delete('/users/:id', { onRequest: [verifyJwt] }, removeUserController)
}
