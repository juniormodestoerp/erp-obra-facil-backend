import type { FastifyInstance } from 'fastify'

import { createPaymentMethodController } from '@modules/methods/http/controllers/create-method-controller'
import { fetchPaymentMethodsController } from '@modules/methods/http/controllers/fetch-methods-controller'
import { fetchSelectInputPaymentMethodsController } from '@modules/methods/http/controllers/fetch-select-input-methods-controller'
import { removePaymentMethodController } from '@modules/methods/http/controllers/remove-method-controller'
import { savePaymentMethodController } from '@modules/methods/http/controllers/save-method-controller'
import { showPaymentMethodController } from '@modules/methods/http/controllers/show-method-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/methods/:id', showPaymentMethodController)
	app.get('/methods', fetchPaymentMethodsController)
	app.get('/methods/select-input', fetchSelectInputPaymentMethodsController)
	app.post('/methods', createPaymentMethodController)
	app.patch('/methods/:id', savePaymentMethodController)
	app.delete('/methods/:id', removePaymentMethodController)
}
