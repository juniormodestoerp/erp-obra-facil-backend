import type { FastifyReply, FastifyRequest } from 'fastify'
import type { MultipartFile } from '@fastify/multipart'
import { z } from 'zod'

import { Email } from '@core/domain/entities/value-object/email'
import { strMessage } from '@core/utils/custom-zod-error'

import { makeUpdateProfileUseCase } from '@modules/users/use-cases/factories/make-update-profile-factory'
import { AppError } from '@core/domain/errors/app-error'

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

	let data: MultipartFile | undefined = undefined

	if (!request.isMultipart()) {
		const invalidRequestType = new AppError({
			code: 'request.not_multipart',
			error: 'Request is not multipart!',
			message: 'A solicitação não está no formato multipart.',
			status: 400,
			data: [],
		})
		return reply.status(400).send(invalidRequestType)
	}

	data = (await request.file({
		limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
	})) as MultipartFile

	if (data !== undefined) {
		const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/gif']

		if (!allowedMimeTypes.includes(data.mimetype)) {
			const invalidFileType = new AppError({
				code: 'file.invalid_type',
				error: 'Invalid file type!',
				message:
					'Tipo de arquivo inválido! Apenas PNG, JPG e GIF são permitidos.',
				status: 400,
				data: [],
			})
			return reply.status(400).send(invalidFileType)
		}
	}

	const updateProfileUseCase = makeUpdateProfileUseCase()

	await updateProfileUseCase.execute({
		userId: request.user.sub,
		data,
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
