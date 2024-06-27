import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { TagsViewModel } from '@modules/tags/http/view-models/tags-view-model'
import { makeSaveTagUseCase } from '@modules/tags/use-cases/factories/make-save-tag-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador da conta'))
		.uuid({
			message: 'O campo identificador da conta deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador da conta é obrigatório.'),
})

const bodySchema = z.object({
	name: z.string(strMessage('nome das tags')),
})

export async function saveTagController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const { name } = bodySchema.parse(request.body)

	const saveTagUseCase = makeSaveTagUseCase()

	const { tag } = await saveTagUseCase.execute({
		id,
		userId: request.user.sub,
		name,
	})

	return reply.status(200).send(TagsViewModel.toHTTP(tag))
}
