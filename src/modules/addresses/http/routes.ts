import type { FastifyInstance } from 'fastify'

import { showMainAddress } from '@modules/addresses/http/controllers/show-main-address-controller'
import { saveAddress } from '@modules/addresses/http/controllers/save-address-controller'
import { removeAddress } from '@modules/addresses/http/controllers/remove-address-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app
		.get('/addresses', showMainAddress)
		.put('/addresses/:id', saveAddress)
		.delete('/addresses/:id', removeAddress)
}
