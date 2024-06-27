import type { FastifyInstance } from 'fastify'

import { createCostAndProfitCenterController } from '@modules/centers/http/controllers/create-center-controller'
import { fetchCentersController } from '@modules/centers/http/controllers/fetch-centers-controller'
import { fetchSelectInputCentersController } from '@modules/centers/http/controllers/fetch-select-input-centers-controller'
import { removeCostAndProfitCenterController } from '@modules/centers/http/controllers/remove-center-controller'
import { saveCostAndProfitCenterController } from '@modules/centers/http/controllers/save-center-controller'
import { showCostAndProfitCenterController } from '@modules/centers/http/controllers/show-center-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/centers/:id', showCostAndProfitCenterController)
	app.get('/centers', fetchCentersController)
	app.get('/centers/select-input', fetchSelectInputCentersController)
	app.post('/centers', createCostAndProfitCenterController)
	app.patch('/centers/:id', saveCostAndProfitCenterController)
	app.delete('/centers/:id', removeCostAndProfitCenterController)
}
