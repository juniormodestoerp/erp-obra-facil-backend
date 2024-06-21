import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeEvolutionByCenterUseCase } from '@modules/metrics/use-cases/factories/make-evolution-by-center-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function evolutionByCenterController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const evolutionByCenterUseCase = makeEvolutionByCenterUseCase()

	await evolutionByCenterUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send()
}
