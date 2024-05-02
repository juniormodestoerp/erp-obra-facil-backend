import { FastifyReply, FastifyRequest } from 'fastify'

import { UserViewModel } from '@modules/users/http/view-models/user-view-model'
import { makeProfileUseCase } from '@modules/users/use-cases/factories/make-profile'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileUseCase = makeProfileUseCase()

  const { user } = await profileUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: await UserViewModel.toHTTP(user),
  })
}
