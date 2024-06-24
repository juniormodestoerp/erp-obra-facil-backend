import type { FastifyInstance } from 'fastify'

import { createTransferController } from '@modules/transfers/http/controllers/create-transfer-controller'
import { fetchTransfersController } from '@modules/transfers/http/controllers/fetch-transfers-controller'
import { fetchSelectInputTransfersController } from '@modules/transfers/http/controllers/fetch-select-input-transfers-controller'
import { removeTransferController } from '@modules/transfers/http/controllers/remove-transfer-controller'
import { saveTransferController } from '@modules/transfers/http/controllers/save-transfer-controller'
import { showTransferController } from '@modules/transfers/http/controllers/show-transfer-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/transfers/:id', showTransferController)
	app.get('/transfers', fetchTransfersController)
	app.get('/transfers/select-input', fetchSelectInputTransfersController)
	app.post('/transfers', createTransferController)
	app.put('/transfers/:id', saveTransferController)
	app.delete('/transfers/:id', removeTransferController)
}
