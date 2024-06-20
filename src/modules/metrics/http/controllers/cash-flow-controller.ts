import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { makeCashFlowUseCase } from '@modules/metrics/use-cases/factories/make-cash-flow-factory'

const schema = z.object({
	name: z.string(strMessage('nome do lançamento')),
})

export async function cashFlowController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name } = schema.parse(request.body)

	const cashFlowUseCase = makeCashFlowUseCase()

	await cashFlowUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(201).send()
}
