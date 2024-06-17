import type { MultipartFile } from '@fastify/multipart'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Email } from '@core/domain/entities/value-object/email'
import { AppError } from '@core/domain/errors/app-error'
import { strMessage } from '@core/utils/custom-zod-error'

import { makeUpdateProfileUseCase } from '@modules/users/use-cases/factories/make-update-profile-factory'

const bodySchema = z.object({
	name: z
		.string(strMessage('nome'))
		.min(1, { message: 'O campo nome é obrigatório.' }),
	email: z.string(strMessage('e-mail')).email('O campo e-mail é inválido.'),
	phone: z
		.string(strMessage('telefone'))
		.length(14, { message: 'O campo telefone deve conter 14 caracteres.' }),
	zipCode: z.string(strMessage('CEP')),
	state: z.string(strMessage('estado')),
	city: z.string(strMessage('cidade')),
	neighborhood: z.string(strMessage('bairro')),
	street: z.string(strMessage('rua')),
	number: z.string(strMessage('número')),
	complement: z.string(strMessage('complemento')).optional(),
})

export async function updateProfileController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const {
		name,
		email,
		phone,
		zipCode,
		state,
		city,
		neighborhood,
		street,
		number,
		complement,
	} = bodySchema.parse(request.body)

	const updateProfileUseCase = makeUpdateProfileUseCase()

	await updateProfileUseCase.execute({
		userId: request.user.sub,
		name,
		email: new Email(email).value,
		phone,
		zipCode,
		state,
		city,
		neighborhood,
		street,
		number,
		complement,
	})

	return reply.status(200).send()
}
