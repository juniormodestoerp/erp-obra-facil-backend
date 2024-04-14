import { FastifyReply } from 'fastify'
import z from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

export const profileSchema = {
  schema: {
    summary: 'User profile',
    tags: ['users'],
    response: {
      200: z.object({
        user: z.object({
          id: z.string(strMessage('id')),
          document: z.string(strMessage('CPF')),
          name: z.string(strMessage('nome')),
          email: z.string(strMessage('e-mail')),
          phone: z.string(strMessage('telefone')),
          role: z.string(strMessage('permissão')),
          createdAt: z.string(strMessage('data de criação')),
          updatedAt: z.string(strMessage('data de atualização')),
          deletedAt: z.string(strMessage('data de exclusão')).optional(),
        }),
      }),
    },
  },
}

export type ProfileReply = FastifyReply & {
  send: (payload: z.infer<(typeof profileSchema.schema.response)[200]>) => void
}
