import { FastifyInstance } from 'fastify'

import { showSetting } from '@modules/settings/http/controllers/show-setting-controller'
import { fetchSettings } from '@modules/settings/http/controllers/fetch-settings-controller'
import { saveSetting } from '@modules/settings/http/controllers/save-setting-controller'
import { removeSetting } from '@modules/settings/http/controllers/remove-setting-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/settings/:id', showSetting)
  app.get('/settings', fetchSettings)
  app.put('/settings/:id', saveSetting)
  app.delete('/settings/:id', removeSetting)
}
