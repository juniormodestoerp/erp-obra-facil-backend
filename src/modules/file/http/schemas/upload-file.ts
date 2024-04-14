import { FastifyRequest } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

export const uploadFileSchema = {
  schema: {
    summary: 'Upload file',
    tags: ['files'],
    params: z.object({
      name: z.string(strMessage('nome')).min(1, 'O campo nome é obrigatório.'),
      contentType: z
        .string(strMessage('tipo de conteúdo'))
        .regex(/\w+\/[-+.\w]+/, {
          message: 'O tipo de conteúdo deve ser válido.',
        })
        .min(1, 'O campo tipo de conteúdo é obrigatório.'),
    }),
    response: {
      200: z.object({
        user: z.object({
          id: z.string(strMessage('id')),
          key: z.string(strMessage('chave')),
          name: z.string(strMessage('nome')),
          email: z.string(strMessage('tipo de conteúdo')),
          createdAt: z.string(strMessage('data de criação')),
          updatedAt: z.string(strMessage('data de atualização')),
          deletedAt: z.string(strMessage('data de exclusão')).optional(),
        }),
        signedUrl: z
          .string(strMessage('url assinada'))
          .url({ message: 'O campo url assinada deve ser uma URL válida.' }),
      }),
    },
  },
}

export type UploadFileRequest = FastifyRequest<{
  Body: z.infer<typeof uploadFileSchema.schema.params>
}>
