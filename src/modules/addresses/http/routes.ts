import type { FastifyInstance } from 'fastify'

import { removeAddress } from '@modules/addresses/http/controllers/remove-address-controller'
import { saveAddress } from '@modules/addresses/http/controllers/save-address-controller'
import { showAddress } from '@modules/addresses/http/controllers/show-address-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function AddressRouter(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app
		.get('/addresses', showAddress)
		.patch('/addresses/:id', saveAddress)
		.delete('/addresses/:id', removeAddress)
}
