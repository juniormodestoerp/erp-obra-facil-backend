import { FastifyInstance } from 'fastify'

import { uploadFile } from '@modules/file/http/controllers/upload-file'
import { uploadFileSchema } from '@modules/file/http/schemas/upload-file'

import { downloadFile } from '@modules/file/http/controllers/download-file'
import { downloadFileSchema } from '@modules/file/http/schemas/download-file'

import { verifyJwt } from '@shared/infra/http/middlewares/verify-jwt'

export async function Router(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/files/:id', { schema: downloadFileSchema.schema }, downloadFile)
  app.post('/files', uploadFileSchema, uploadFile)
}
