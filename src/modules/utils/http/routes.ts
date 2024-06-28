import type { FastifyInstance } from 'fastify'

import { showAddress } from '@modules/utils/http/controllers/show-address'

import { showZipCode } from '@modules/utils/http/controllers/show-zip-code'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function UtilsRouter(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/utils/zip-codes/:zipCode/addresses', showAddress)

	app.get('/utils/addresses/:address/zip-codes', showZipCode)
}
