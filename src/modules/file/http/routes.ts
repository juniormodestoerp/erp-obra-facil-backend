import { FastifyInstance } from 'fastify'

import { uploadFile } from '@modules/file/http/controllers/upload-file'
import { downloadFile } from '@modules/file/http/controllers/download-file'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/files/:id', { onRequest: [verifyJwt] }, downloadFile)
  app.post('/files', { onRequest: [verifyJwt] }, uploadFile)
}
