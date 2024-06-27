import type { FastifyReply, FastifyRequest } from 'fastify'

import { TagsViewModel } from '@modules/tags/http/view-models/tags-view-model'
import { makeFetchTagsUseCase } from '@modules/tags/use-cases/factories/make-fetch-tags-factory'

export async function fetchTagsController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchTagsUseCase = makeFetchTagsUseCase()

	const { tags } = await fetchTagsUseCase.execute({
		userId: request.user.sub,
	})

	return reply
		.status(200)
		.send(tags.map((tag) => TagsViewModel.toHTTP(tag) ?? []))
}
