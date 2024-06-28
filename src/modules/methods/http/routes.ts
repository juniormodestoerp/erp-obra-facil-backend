import type { FastifyInstance } from 'fastify'

import { createMethodController } from '@modules/methods/http/controllers/create-method-controller'
import { fetchMethodsController } from '@modules/methods/http/controllers/fetch-methods-controller'
import { fetchSelectInputMethodsController } from '@modules/methods/http/controllers/fetch-select-input-methods-controller'
import { removeMethodController } from '@modules/methods/http/controllers/remove-method-controller'
import { saveMethodController } from '@modules/methods/http/controllers/save-method-controller'
import { showMethodController } from '@modules/methods/http/controllers/show-method-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function MethodRouter(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/methods/:id', showMethodController)
	app.get('/methods', fetchMethodsController)
	app.get('/methods/select-input', fetchSelectInputMethodsController)
	app.post('/methods', createMethodController)
	app.patch('/methods/:id', saveMethodController)
	app.delete('/methods/:id', removeMethodController)
}
