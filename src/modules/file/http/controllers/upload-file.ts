import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { makeUploadFileUseCase } from '@modules/file/use-cases/factories/make-upload-file'

const bodySchema = z.object({
  name: z.string(strMessage('nome')).min(1, 'O campo nome é obrigatório.'),
  contentType: z
    .string(strMessage('tipo de conteúdo'))
    .regex(/\w+\/[-+.\w]+/, {
      message: 'O tipo de conteúdo deve ser válido.',
    })
    .min(1, 'O campo tipo de conteúdo é obrigatório.'),
})

export async function uploadFile(request: FastifyRequest, reply: FastifyReply) {
  const { name, contentType } = bodySchema.parse(request.body)

  const uploadFileUseCase = makeUploadFileUseCase()

  const { file, signedUrl } = await uploadFileUseCase.execute({
    name,
    contentType,
  })

  return reply.status(200).send({
    file,
    signedUrl,
  })
}
