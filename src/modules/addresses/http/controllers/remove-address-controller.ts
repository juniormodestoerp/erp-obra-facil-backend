import type {
	FastifyRequest,
	FastifyReply,
} from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeRemoveAddressUseCase } from '@modules/addresses/use-cases/factories/make-remove-address'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador do endereço'))
		.uuid({ message: 'O campo identificador do endereço deve ser um UUID válido.' })
		.min(1, 'O campo identificador do endereço é obrigatório.'),
})


export async function removeAddress(request: FastifyRequest, reply: FastifyReply) {
	const { id } = paramsSchema.parse(request.params)

	const removeAddressUseCase = makeRemoveAddressUseCase()

	await removeAddressUseCase.execute({
		id,
		userId: request.user.sub,
	})

	return reply.status(204).send()
}
