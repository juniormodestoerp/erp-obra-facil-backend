import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeDownloadFileUseCase } from '@modules/file/use-cases/factories/make-download-file'

const paramsSchema = z.object({
  id: z
    .string(strMessage('id'))
    .uuid({ message: 'O campo id deve ser um UUID válido.' })
    .min(1, 'O campo id é obrigatório.'),
})

export async function downloadFile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)

  const downloadFileUseCase = makeDownloadFileUseCase()

  const { signedUrl } = await downloadFileUseCase.execute({
    id,
  })

  return reply.status(200).send({
    signedUrl,
  })
}
