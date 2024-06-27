import type { FastifyInstance } from 'fastify'

import { createBankAccountController } from '@modules/accounts/http/controllers/create-bank-account-controller'
import { fetchBankAccountsController } from '@modules/accounts/http/controllers/fetch-bank-accounts-controller'
import { fetchSelectInputBankAccountsController } from '@modules/accounts/http/controllers/fetch-select-input-bank-accounts-controller'
import { removeBankAccountController } from '@modules/accounts/http/controllers/remove-bank-account-controller'
import { saveBankAccountController } from '@modules/accounts/http/controllers/save-bank-account-controller'
import { showBankAccountController } from '@modules/accounts/http/controllers/show-bank-account-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/accounts/:id', showBankAccountController)
	app.get('/bank-accounts', fetchBankAccountsController)
	app.get('/accounts/select-input', fetchSelectInputBankAccountsController)
	app.post('/bank-accounts', createBankAccountController)
	app.patch('/accounts/:id', saveBankAccountController)
	app.delete('/accounts/:id', removeBankAccountController)
}
