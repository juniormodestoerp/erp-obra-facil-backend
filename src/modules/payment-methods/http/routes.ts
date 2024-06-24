import type { FastifyInstance } from 'fastify'

import { createPaymentMethodController } from '@modules/paymentMethods/http/controllers/create-payment-method-controller'
import { fetchPaymentMethodsController } from '@modules/paymentMethods/http/controllers/fetch-paymentMethods-controller'
import { fetchSelectInputPaymentMethodsController } from '@modules/paymentMethods/http/controllers/fetch-select-input-paymentMethods-controller'
import { removePaymentMethodController } from '@modules/paymentMethods/http/controllers/remove-payment-method-controller'
import { savePaymentMethodController } from '@modules/paymentMethods/http/controllers/save-payment-method-controller'
import { showPaymentMethodController } from '@modules/paymentMethods/http/controllers/show-payment-method-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/paymentMethods/:id', showPaymentMethodController)
	app.get('/paymentMethods', fetchPaymentMethodsController)
	app.get('/paymentMethods/select-input', fetchSelectInputPaymentMethodsController)
	app.post('/paymentMethods', createPaymentMethodController)
	app.put('/paymentMethods/:id', savePaymentMethodController)
	app.delete('/paymentMethods/:id', removePaymentMethodController)
}
