import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { TagsViewModel } from '@modules/tags/http/view-models/tags-view-model'
import { makeCreateTagUseCase } from '@modules/tags/use-cases/factories/make-create-tag-factory'

const bodySchema = z.object({
	name: z.string(strMessage('nome da conta')),
})

export async function createTagController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = bodySchema.parse(
		request.body,
	)

	const createTagUseCase = makeCreateTagUseCase()

	const { tag } = await createTagUseCase.execute({
		userId: request.user.sub,
		name,
	})

	return reply.status(201).send(TagsViewModel.toHTTP(tag))
}
