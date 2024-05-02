import { FastifyInstance } from 'fastify'

import { fetchSettings } from '@modules/settings/http/controllers/fetch-settings-controller'
import { createSetting } from '@modules/settings/http/controllers/save-setting-controller'
import { removeSetting } from '@modules/settings/http/controllers/remove-setting-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/settings', fetchSettings)
  app.post('/settings', createSetting)
  app.delete('/settings/:id', removeSetting)
}
