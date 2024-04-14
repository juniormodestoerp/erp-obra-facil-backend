import { FastifyReply } from 'fastify'
import z from 'zod'
import { strMessage } from '@core/utils/custom-zod-error'

export const refreshSchema = {
  schema: {
    summary: 'Authenticate user by refreshing token',
    tags: ['sessions'],
    response: {
      200: z.object({
        accessToken: z
          .string(strMessage('token de acesso'))
          .uuid({ message: 'O campo id deve ser um UUID válido.' }),
      }),
    },
  },
}

export type RefreshReply = FastifyReply & {
  send: (payload: z.infer<(typeof refreshSchema.schema.response)[200]>) => void
}
