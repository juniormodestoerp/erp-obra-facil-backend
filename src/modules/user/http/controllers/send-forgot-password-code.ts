import { FastifyReply } from 'fastify'

import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'

import { SendForgotPasswordCodeSchemaRequest } from '@modules/user/http/schemas/send-forgot-password-code'
import { makeSendForgotPasswordCodeUseCase } from '@modules/user/use-cases/factories/make-send-forgot-password-code'

export async function sendForgotPasswordCode(
  request: SendForgotPasswordCodeSchemaRequest,
  reply: FastifyReply,
) {
  const { document, email } = request.body

  const sendForgotPasswordCodeUseCase = makeSendForgotPasswordCodeUseCase()

  await sendForgotPasswordCodeUseCase.execute({
    protocol: request.protocol,
    hostname: request.hostname,
    document: document && new Document(document, 'CPF').value,
    email: email && new Email(email).value,
  })

  return reply.status(200).send()
}
