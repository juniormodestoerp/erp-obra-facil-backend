import { FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

export const downloadFileSchema = {
  schema: {
    summary: 'Download file',
    tags: ['files'],
    params: z.object({
      id: z
        .string(strMessage('id'))
        .uuid({ message: 'O campo id deve ser um UUID válido.' })
        .min(1, 'O campo id é obrigatório.'),
    }),
    response: {
      200: z.object({
        signedUrl: z
          .string(strMessage('url assinada'))
          .url({ message: 'O campo url assinada deve ser uma URL válida.' }),
      }),
    },
  },
}

export type DownloadFileRequest = FastifyRequest<{
  Params: z.infer<typeof downloadFileSchema.schema.params>
}>
