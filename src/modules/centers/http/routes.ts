import type { FastifyInstance } from 'fastify'

import { createCenterController } from '@modules/centers/http/controllers/create-center-controller'
import { fetchCentersController } from '@modules/centers/http/controllers/fetch-centers-controller'
import { fetchSelectInputCentersController } from '@modules/centers/http/controllers/fetch-select-input-centers-controller'
import { removeCenterController } from '@modules/centers/http/controllers/remove-center-controller'
import { saveCenterController } from '@modules/centers/http/controllers/save-center-controller'
import { showCenterController } from '@modules/centers/http/controllers/show-center-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/centers/:id', showCenterController)
	app.get('/centers', fetchCentersController)
	app.get('/centers/select-input', fetchSelectInputCentersController)
	app.post('/centers', createCenterController)
	app.patch('/centers/:id', saveCenterController)
	app.delete('/centers/:id', removeCenterController)
}
