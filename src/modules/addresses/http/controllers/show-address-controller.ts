import type { FastifyReply, FastifyRequest } from 'fastify'

import { AddressViewModel } from '@modules/addresses/http/view-models/address-view-model'
import { makeShowAddressUseCase } from '@modules/addresses/use-cases/factories/make-show-address'

export async function showAddress(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const showAddressUseCase = makeShowAddressUseCase()

	const { address } = await showAddressUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(AddressViewModel.toHTTP(address))
}
