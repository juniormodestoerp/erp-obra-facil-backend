import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { Email } from '@core/domain/entities/value-object/email'
import { strMessage } from '@core/utils/custom-zod-error'

import { UserViewModel } from '@modules/users/http/view-models/user-view-model'
import { makeAuthenticateUseCase } from '@modules/users/use-cases/factories/make-authenticate'

const schema = z.object({
  email: z
    .string(strMessage('e-mail'))
    .email('O campo e-mail deve conter um endereço de email válido.')
    .min(1, 'O campo e-mail é obrigatório.'),
  password: z
    .string(strMessage('senha'))
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
      message:
        'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número, um caractere especial e no mínimo 8 caracteres.',
    }),
})

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = schema.parse(request.body)

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
