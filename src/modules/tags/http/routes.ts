import type { FastifyInstance } from 'fastify'

import { createTagController } from '@modules/tags/http/controllers/create-tag-controller'
import { fetchSelectInputTagsController } from '@modules/tags/http/controllers/fetch-select-input-tags-controller'
import { fetchTagsController } from '@modules/tags/http/controllers/fetch-tags-controller'
import { removeTagController } from '@modules/tags/http/controllers/remove-tag-controller'
import { saveTagController } from '@modules/tags/http/controllers/save-tag-controller'
import { showTagController } from '@modules/tags/http/controllers/show-tag-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function TagsRouter(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/tags/:id', showTagController)
	app.get('/tags', fetchTagsController)
	app.get('/tags/select-input', fetchSelectInputTagsController)
	app.post('/tags', createTagController)
	app.patch('/tags/:id', saveTagController)
	app.delete('/tags/:id', removeTagController)
}
