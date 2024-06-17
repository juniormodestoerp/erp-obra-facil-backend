import type { MultipartFile } from '@fastify/multipart'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { AppError } from '@core/domain/errors/app-error'

import { makeUpdateProfilePictureUseCase } from '@modules/users/use-cases/factories/make-update-profile-picture-factory'

export async function updateProfilePictureController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
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

	const updateProfilePictureUseCase = makeUpdateProfilePictureUseCase()

	const { profilePicture } = await updateProfilePictureUseCase.execute({
		userId: request.user.sub,
		data,
	})

	return reply.status(200).send({
		profilePicture,
	})
}
