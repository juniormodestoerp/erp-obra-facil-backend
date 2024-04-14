import { FastifyReply } from 'fastify'

import { ResetForgotPasswordRequest } from '@modules/user/http/schemas/reset-forgot-password'
import { makeResetForgotPasswordUseCase } from '@modules/user/use-cases/factories/make-reset-forgot-password'

export async function resetForgotPassword(
  request: ResetForgotPasswordRequest,
  reply: FastifyReply,
) {
  const { token, code, password } = request.body

  const resetForgotPasswordUseCase = makeResetForgotPasswordUseCase()

  await resetForgotPasswordUseCase.execute({
    token,
    code,
    password,
  })

  return reply.status(200).send()
}
