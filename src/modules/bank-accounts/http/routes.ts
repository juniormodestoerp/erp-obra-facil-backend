import type { FastifyInstance } from 'fastify'

import { createBankAccountController } from '@modules/bank-accounts/http/controllers/create-bank-account-controller'
import { fetchBankAccountsController } from '@modules/bank-accounts/http/controllers/fetch-bank-accounts-controller'
import { fetchSelectInputBankAccountsController } from '@modules/bank-accounts/http/controllers/fetch-select-input-bank-accounts-controller'
import { removeBankAccountController } from '@modules/bank-accounts/http/controllers/remove-bank-account-controller'
import { saveBankAccountController } from '@modules/bank-accounts/http/controllers/save-bank-account-controller'
import { showBankAccountController } from '@modules/bank-accounts/http/controllers/show-bank-account-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/bank-accounts/:id', showBankAccountController)
	app.get('/bank-accounts', fetchBankAccountsController)
	app.get('/bank-accounts/select-input', fetchSelectInputBankAccountsController)
	app.post('/bank-accounts', createBankAccountController)
	app.put('/bank-accounts/:id', saveBankAccountController)
	app.delete('/bank-accounts/:id', removeBankAccountController)
}
