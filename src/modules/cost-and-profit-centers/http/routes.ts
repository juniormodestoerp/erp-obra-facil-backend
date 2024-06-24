import type { FastifyInstance } from 'fastify'

import { createCostAndProfitCenterController } from '@modules/cost-and-profit-centers/http/controllers/create-cost-and-profit-center-controller'
import { fetchCostAndProfitCentersController } from '@modules/cost-and-profit-centers/http/controllers/fetch-cost-and-profit-centers-controller'
import { fetchSelectInputCostAndProfitCentersController } from '@modules/cost-and-profit-centers/http/controllers/fetch-select-input-cost-and-profit-centers-controller'
import { removeCostAndProfitCenterController } from '@modules/cost-and-profit-centers/http/controllers/remove-cost-and-profit-center-controller'
import { saveCostAndProfitCenterController } from '@modules/cost-and-profit-centers/http/controllers/save-cost-and-profit-center-controller'
import { showCostAndProfitCenterController } from '@modules/cost-and-profit-centers/http/controllers/show-cost-and-profit-center-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/cost-and-profit-centers/:id', showCostAndProfitCenterController)
	app.get('/cost-and-profit-centers', fetchCostAndProfitCentersController)
	app.get('/cost-and-profit-centers/select-input', fetchSelectInputCostAndProfitCentersController)
	app.post('/cost-and-profit-centers', createCostAndProfitCenterController)
	app.put('/cost-and-profit-centers/:id', saveCostAndProfitCenterController)
	app.delete('/cost-and-profit-centers/:id', removeCostAndProfitCenterController)
}
