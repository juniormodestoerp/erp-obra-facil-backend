import type { FastifyInstance } from 'fastify'

import { authenticateUserController } from '@modules/users/http/controllers/authenticate-user-controller'
import { createUserController } from '@modules/users/http/controllers/create-user-controller'
import { removeUserController } from '@modules/users/http/controllers/remove-user-controller'
import { resetForgotPasswordController } from '@modules/users/http/controllers/reset-forgot-password-controller'
import { saveUserController } from '@modules/users/http/controllers/save-user-controller'
import { sendForgotPasswordCodeController } from '@modules/users/http/controllers/send-forgot-password-code-controller'
import { showUserProfileController } from '@modules/users/http/controllers/show-user-profile-controller'
import { updateProfilePictureController } from '@modules/users/http/controllers/update-profile-picture-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.get(
		'/users/profile',
		{ onRequest: [verifyJwt] },
		showUserProfileController,
	)

	app.post(
		'/users/profile-picture',
		{ onRequest: [verifyJwt] },
		updateProfilePictureController,
	)

	app.post('/sessions', authenticateUserController)

	app.post('/password/reset', resetForgotPasswordController)

	app.post('/password/forgot', sendForgotPasswordCodeController)

	app.post('/users', createUserController)

	app.patch('/users', { onRequest: [verifyJwt] }, saveUserController)

	app.delete('/users/:id', { onRequest: [verifyJwt] }, removeUserController)
}
