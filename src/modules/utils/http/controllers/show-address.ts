import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeShowAddressUseCase } from '@modules/utils/use-cases/factories/make-show-address'

const paramsSchema = z.object({
	zipCode: z.string(strMessage('CEP')).min(1, 'O campo CEP é obrigatório.'),
})

export async function showAddress(request: FastifyRequest, reply: FastifyReply) {
	const { zipCode } = paramsSchema.parse(request.params)

	const showAddressUseCase = makeShowAddressUseCase()

	const address = await showAddressUseCase.execute({
		zipCode,
	})

	return reply.status(200).send(address)
}
