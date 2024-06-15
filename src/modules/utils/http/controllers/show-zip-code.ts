import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeShowZipCodeUseCase } from '@modules/utils/use-cases/factories/make-show-zipcode'

const paramsSchema = z.object({
	address: z.string(strMessage('endereço')).min(1, 'O endereço é obrigatório.'),
})

export async function showZipCode(request: FastifyRequest, reply: FastifyReply) {
	const { address } = paramsSchema.parse(request.params)

	const showZipCodeUseCase = makeShowZipCodeUseCase()

	const { zipCode } = await showZipCodeUseCase.execute({
		address,
	})

	return reply.status(200).send(zipCode)
}
