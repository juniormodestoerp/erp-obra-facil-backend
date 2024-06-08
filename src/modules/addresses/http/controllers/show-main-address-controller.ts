import type {
	FastifyRequest,
	FastifyReply,
} from 'fastify'

import { makeShowMainAddressUseCase } from '@modules/addresses/use-cases/factories/make-show-main-address'
import { AddressViewModel } from '@modules/addresses/http/view-models/address-view-model'

export async function showMainAddress(request: FastifyRequest, reply: FastifyReply) {
	const showMainAddressUseCase = makeShowMainAddressUseCase()

	const { address } = await showMainAddressUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(AddressViewModel.toHTTP(address))
}
