import { FastifyReply } from 'fastify'

import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'

import { RegisterRequest } from '@modules/user/http/schemas/register'
import { makeRegisterUseCase } from '@modules/user/use-cases/factories/make-register'
import { UserViewModel } from '@modules/user/http/view-models/user-view-model'

export async function register(request: RegisterRequest, reply: FastifyReply) {
  const { name, document, email, phone, password } = request.body

  const registerUseCase = makeRegisterUseCase()

  const { user } = await registerUseCase.execute({
    name,
    document: new Document(document, 'CPF'),
    email: new Email(email),
    phone,
    password,
  })

  const accessToken = await reply.jwtSign(
    {
      role: 'USER',
    },
    {
      sign: {
        sub: user.id,
        expiresIn: 60 * 60, // 1 hour
      },
    },
  )

  return reply.status(201).send({
    user: await UserViewModel.toHTTP(user),
    accessToken,
  })
}
