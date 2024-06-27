import type { FastifyInstance } from 'fastify'

import { fetchSettings } from '@modules/settings/http/controllers/fetch-settings-controller'
import { removeSetting } from '@modules/settings/http/controllers/remove-setting-controller'
import { saveSetting } from '@modules/settings/http/controllers/save-setting-controller'
import { showSetting } from '@modules/settings/http/controllers/show-setting-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/settings:id', showSetting)
	app.get('/settings', fetchSettings)
	app.patch('/settings/:id', saveSetting)
	app.delete('/settings/:id', removeSetting)
}
// type: string
// date: string
// amount: number
// description: string
// account: string
// status: string
// category: string
// card: string | null
// contact: string | null
// center: string | null
// project: string | null
// method: string | null
// documentNumber: string | null
// notes: string | null
// competenceDate: string | null
// tags: string[] | null