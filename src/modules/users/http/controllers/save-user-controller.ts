import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Email } from '@core/domain/entities/value-object/email'
import { strMessage } from '@core/utils/custom-zod-error'

import { UserProfileViewModel } from '@modules/users/http/view-models/user-profile-model'
import { makeSaveUserUseCase } from '@modules/users/use-cases/factories/make-save-user-factory'

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
	complement: z.string(strMessage('complemento')),
})

export async function saveUserController(
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
		street,
		neighborhood,
		number,
		complement,
	} = bodySchema.parse(request.body)

	const saveUserUseCase = makeSaveUserUseCase()

	const { user } = await saveUserUseCase.execute({
		id: request.user.sub,
		name,
		email: new Email(email).value,
		phone,
		zipCode,
		state,
		city,
		street,
		neighborhood,
		number,
		complement,
	})

	return reply.status(200).send(UserProfileViewModel.toHTTP(user))
}
