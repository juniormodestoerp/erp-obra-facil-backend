import type { FastifyReply, FastifyRequest } from 'fastify'

import { UserViewModel } from '@modules/users/http/view-models/user-view-model'
import { makeShowUserProfileUseCase } from '@modules/users/use-cases/factories/make-show-user-profile-factory'

export async function showUserProfileController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const showUserProfileUseCase = makeShowUserProfileUseCase()

	const { user } = await showUserProfileUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(UserViewModel.toHTTP(user))
}
