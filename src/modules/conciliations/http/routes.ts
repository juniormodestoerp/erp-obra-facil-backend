import type { FastifyInstance } from 'fastify'

import { addConciliationController } from '@modules/conciliations/http/controllers/add-conciliation-controller'
import { createConciliationController } from '@modules/conciliations/http/controllers/create-conciliation-controller'
import { exportWorksheetController } from '@modules/conciliations/http/controllers/export-excel-controller'
import { verifyOfxController } from '@modules/conciliations/http/controllers/verify-ofx-controller'
import { verifyXlsxController } from '@modules/conciliations/http/controllers/verify-xlsx-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'
import { addManyController } from './controllers/add-many-controller'
import { addOneController } from './controllers/add-one-controller'

export async function ConciliationsRouter(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.post('/conciliations', createConciliationController)
	app.post('/conciliations/add', addConciliationController)
	app.get('/conciliations/export-worksheet', exportWorksheetController)
	app.post('/conciliations/import-worksheet', verifyXlsxController)
	app.post('/conciliations/import-ofx', verifyOfxController)
	app.post('/conciliations/add-one', addOneController)
	app.post('/conciliations/add-many', addManyController)
}
