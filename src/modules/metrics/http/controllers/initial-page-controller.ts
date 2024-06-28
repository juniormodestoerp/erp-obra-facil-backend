import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeInicialPageUseCase } from '@modules/metrics/use-cases/factories/make-initial-page-factory'

export async function initialPageController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const inicialPageUseCase = makeInicialPageUseCase()

	const { stats, outstandingInvoices, overdueInvoices } = await inicialPageUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send({
		stats,
		outstandingInvoices,
		overdueInvoices,
	})
}
