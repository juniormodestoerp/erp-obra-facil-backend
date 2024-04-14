import { FastifyReply } from 'fastify'

import { Email } from '@core/domain/entities/value-object/email'

import type { AuthenticateRequest } from '@modules/user/http/schemas/autenticate'
import { makeAuthenticateUseCase } from '@modules/user/use-cases/factories/make-authenticate'
import { UserViewModel } from '@modules/user/http/view-models/user-view-model'

export async function authenticate(
  request: AuthenticateRequest,
  reply: FastifyReply,
) {
  const { email, password } = request.body

  const authenticateUseCase = makeAuthenticateUseCase()

  const { user } = await authenticateUseCase.execute({
    email: new Email(email),
    password,
  })

  const accessToken = await reply.jwtSign(
    {
      role: 'USER',
    },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {
      role: user.role,
    },
    {
      sign: {
        sub: user.id,
        expiresIn: '3d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      user: await UserViewModel.toHTTP(user),
      accessToken,
    })
}
