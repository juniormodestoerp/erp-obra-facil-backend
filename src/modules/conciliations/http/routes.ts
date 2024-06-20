import type { FastifyInstance } from 'fastify'

import { addConciliationController } from '@modules/conciliations/http/controllers/add-conciliation-controller'
import { createConciliationController } from '@modules/conciliations/http/controllers/create-conciliation-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.post('/conciliations', createConciliationController)
	app.post('/conciliations/add', addConciliationController)
}
