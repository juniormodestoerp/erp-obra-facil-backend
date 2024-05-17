import { FastifyInstance } from 'fastify'

import { showCategoryController } from '@modules/categories/http/controllers/show-category-controller'
import { fetchCategories } from '@modules/categories/http/controllers/fetch-categories-controller'
import { saveCategory } from '@modules/categories/http/controllers/save-category-controller'
import { removeCategoryController } from '@modules/categories/http/controllers/remove-category-controller'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/categories/:id', showCategoryController)
  app.get('/categories', fetchCategories)
  app.put('/categories/:id', saveCategory)
  app.delete('/categories/:id', removeCategoryController)
}
