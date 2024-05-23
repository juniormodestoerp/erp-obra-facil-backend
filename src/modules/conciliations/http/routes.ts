import { FastifyInstance } from 'fastify'

import { createConciliationController } from '@modules/conciliations/http/controllers/create-conciliation-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/conciliations', createConciliationController)
}
