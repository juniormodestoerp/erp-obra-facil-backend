import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchSelectInputTagsUseCase } from '@modules/tags/use-cases/factories/make-fetch-select-input-tags-factory'

export async function fetchSelectInputTagsController(
	_: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchSelectInputTagsUseCase = makeFetchSelectInputTagsUseCase()

	const { tags } = await fetchSelectInputTagsUseCase.execute()

	return reply.status(200).send(tags)
}
