import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { TagsViewModel } from '@modules/tags/http/view-models/tags-view-model'
import { makeShowTagUseCase } from '@modules/tags/use-cases/factories/make-show-tag-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador da conta'))
		.uuid({
			message: 'O campo identificador da conta deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador da conta é obrigatório.'),
})

export async function showTagController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const showTagUseCase = makeShowTagUseCase()

	const { tag } = await showTagUseCase.execute({
		id,
	})

	return reply.status(200).send(TagsViewModel.toHTTP(tag))
}
