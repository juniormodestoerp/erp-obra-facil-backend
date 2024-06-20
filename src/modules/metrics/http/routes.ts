import type { FastifyInstance } from 'fastify'

import { accountsPayableController } from '@modules/metrics/http/controllers/accounts-payable-controller'
import { accountsReceivableController } from '@modules/metrics/http/controllers/accounts-receivable-controller'
import { cashEntriesController } from '@modules/metrics/http/controllers/cash-entries-controller'
import { cashFlowController } from '@modules/metrics/http/controllers/cash-flow-controller'
import { entriesByCategoryController } from '@modules/metrics/http/controllers/entries-by-category-controller'
import { entriesByCenterController } from '@modules/metrics/http/controllers/entries-by-center-controller'
import { entriesByContactController } from '@modules/metrics/http/controllers/entries-by-contact-controller'
import { entriesByProjectController } from '@modules/metrics/http/controllers/entries-by-project-controller'
import { evolutionByCategoryController } from '@modules/metrics/http/controllers/evolution-by-category-controller'
import { evolutionByCenterController } from '@modules/metrics/http/controllers/evolution-by-center-controller'
import { evolutionByContactController } from '@modules/metrics/http/controllers/evolution-by-contact-controller'
import { paidAccountsController } from '@modules/metrics/http/controllers/paid-accounts-controller'
import { projectResultsController } from '@modules/metrics/http/controllers/project-results-controller'
import { receivedAccountsController } from '@modules/metrics/http/controllers/received-accounts-controller'
import { totalsByCategoryController } from '@modules/metrics/http/controllers/totals-by-category-controller'
import { totalsByCenterController } from '@modules/metrics/http/controllers/totals-by-center-controller'
import { totalsByContactController } from '@modules/metrics/http/controllers/totals-by-contact-controller'
import { totalsByProjectController } from '@modules/metrics/http/controllers/totals-by-project-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/metrics/accounts-payable', accountsPayableController)
	app.get('/metrics/accounts-receivable', accountsReceivableController)
	app.get('/metrics/cash-entries', cashEntriesController)
	app.get('/metrics/cash-flow', cashFlowController)
	app.get('/metrics/entries-by-category', entriesByCategoryController)
	app.get('/metrics/entries-by-center', entriesByCenterController)
	app.get('/metrics/entries-by-contact', entriesByContactController)
	app.get('/metrics/entries-by-project', entriesByProjectController)
	app.get('/metrics/evolution-by-category', evolutionByCategoryController)
	app.get('/metrics/evolution-by-center', evolutionByCenterController)
	app.get('/metrics/evolution-by-contact', evolutionByContactController)
	app.get('/metrics/paid-accounts', paidAccountsController)
	app.get('/metrics/project-results', projectResultsController)
	app.get('/metrics/received-accounts', receivedAccountsController)
	app.get('/metrics/totals-by-category', totalsByCategoryController)
	app.get('/metrics/totals-by-center', totalsByCenterController)
	app.get('/metrics/totals-by-contact', totalsByContactController)
	app.get('/metrics/totals-by-project', totalsByProjectController)
}
