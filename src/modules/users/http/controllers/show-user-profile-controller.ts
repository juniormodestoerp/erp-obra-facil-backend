import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeShowUserProfileUseCase } from '@modules/users/use-cases/factories/make-show-user-profile-factory'
import { UserProfileViewModel } from '@modules/users/http/view-models/user-profile-model'

export async function showUserProfileController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const showUserProfileUseCase = makeShowUserProfileUseCase()

	const { user } = await showUserProfileUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(UserProfileViewModel.toHTTP(user))
}
