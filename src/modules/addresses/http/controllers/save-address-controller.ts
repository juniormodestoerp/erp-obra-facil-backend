import type {
	FastifyRequest,
	FastifyReply,
} from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeSaveAddressUseCase } from '@modules/addresses/use-cases/factories/make-save-address'
import { AddressViewModel } from '@modules/addresses/http/view-models/address-view-model'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador do endereço'))
		.uuid({ message: 'O campo identificador do endereço deve ser um UUID válido.' })
		.min(1, 'O campo identificador do endereço é obrigatório.'),
})

const schema = z.object({
	zipCode: z.string(strMessage('CEP')),
	state: z.string(strMessage('estado')),
	city: z.string(strMessage('cidade')),
	neighborhood: z.string(strMessage('bairro')),
	street: z.string(strMessage('rua')),
	number: z.string(strMessage('número')),
	complement: z.string(strMessage('complemento')).optional(),
})


export async function saveAddress(request: FastifyRequest, reply: FastifyReply) {
	const { id } = paramsSchema.parse(request.params)
	const { zipCode, state, city, neighborhood, street, number, complement } =
		schema.parse(request.body)

	const saveAddressUseCase = makeSaveAddressUseCase()

	const { address } = await saveAddressUseCase.execute({
		id,
		userId: request.user.sub,
		zipCode,
		state,
		city,
		neighborhood,
		street,
		number,
		complement,
	})

	return reply.status(200).send(AddressViewModel.toHTTP(address))
}
