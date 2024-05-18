import { FastifyInstance } from 'fastify'

import { showCategoryController } from '@modules/categories/http/controllers/show-category-controller'
import { fetchCategoriesController } from '@modules/categories/http/controllers/fetch-categories-controller'
import { saveCategoryController } from '@modules/categories/http/controllers/save-category-controller'
import { removeCategoryController } from '@modules/categories/http/controllers/remove-category-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/categories/:id', showCategoryController)
  app.get('/categories', fetchCategoriesController)
  app.put('/categories/:id', saveCategoryController)
  app.delete('/categories/:id', removeCategoryController)
}
