import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeTotalsByCenterUseCase } from '@modules/metrics/use-cases/factories/make-totals-by-center-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function totalsByCenterController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const totalsByCenterUseCase = makeTotalsByCenterUseCase()

	await totalsByCenterUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send()
}
