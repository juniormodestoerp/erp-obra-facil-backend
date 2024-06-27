import type { FastifyInstance } from 'fastify'

import { createAccountController } from '@modules/accounts/http/controllers/create-account-controller'
import { fetchAccountsController } from '@modules/accounts/http/controllers/fetch-accounts-controller'
import { fetchSelectInputAccountsController } from '@modules/accounts/http/controllers/fetch-select-input-accounts-controller'
import { removeAccountController } from '@modules/accounts/http/controllers/remove-account-controller'
import { saveAccountController } from '@modules/accounts/http/controllers/save-account-controller'
import { showAccountController } from '@modules/accounts/http/controllers/show-account-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/accounts/:id', showAccountController)
	app.get('/accounts', fetchAccountsController)
	app.get('/accounts/select-input', fetchSelectInputAccountsController)
	app.post('/accounts', createAccountController)
	app.patch('/accounts/:id', saveAccountController)
	app.delete('/accounts/:id', removeAccountController)
}
