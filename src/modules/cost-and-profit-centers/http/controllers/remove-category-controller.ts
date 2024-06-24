import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeRemoveCategoryUseCase } from '@modules/categories/use-cases/factories/make-remove-category-factory'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador da categoria'))
		.uuid({
			message: 'O campo identificador da categoria deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador da categoria é obrigatório.'),
})

export async function removeCategoryController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const removeCategoryUseCase = makeRemoveCategoryUseCase()

	await removeCategoryUseCase.execute({
		id,
	})

	return reply.status(204).send()
}
