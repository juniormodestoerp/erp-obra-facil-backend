import type { FastifyInstance } from 'fastify'

import { createPaymentMethodController } from '@modules/payment-methods/http/controllers/create-payment-method-controller'
import { fetchPaymentMethodsController } from '@modules/payment-methods/http/controllers/fetch-payment-methods-controller'
import { fetchSelectInputPaymentMethodsController } from '@modules/payment-methods/http/controllers/fetch-select-input-payment-methods-controller'
import { removePaymentMethodController } from '@modules/payment-methods/http/controllers/remove-payment-method-controller'
import { savePaymentMethodController } from '@modules/payment-methods/http/controllers/save-payment-method-controller'
import { showPaymentMethodController } from '@modules/payment-methods/http/controllers/show-payment-method-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/payment-methods/:id', showPaymentMethodController)
	app.get('/payment-methods', fetchPaymentMethodsController)
	app.get(
		'/payment-methods/select-input',
		fetchSelectInputPaymentMethodsController,
	)
	app.post('/payment-methods', createPaymentMethodController)
	app.patch('/payment-methods/:id', savePaymentMethodController)
	app.delete('/payment-methods/:id', removePaymentMethodController)
}
