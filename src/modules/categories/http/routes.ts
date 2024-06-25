import type { FastifyInstance } from 'fastify'

import { createCategoryController } from '@modules/categories/http/controllers/create-category-controller'
import { fetchCategoriesController } from '@modules/categories/http/controllers/fetch-categories-controller'
import { fetchSelectInputCategoriesController } from '@modules/categories/http/controllers/fetch-select-input-categories-controller'
import { removeCategoryController } from '@modules/categories/http/controllers/remove-category-controller'
import { saveCategoryController } from '@modules/categories/http/controllers/save-category-controller'
import { showCategoryController } from '@modules/categories/http/controllers/show-category-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.get('/categories/:id', showCategoryController)
	app.get('/categories', fetchCategoriesController)
	app.get('/categories/select-input', fetchSelectInputCategoriesController)
	app.post('/categories', createCategoryController)
	app.patch('/categories/:id', saveCategoryController)
	app.delete('/categories/:id', removeCategoryController)
}
