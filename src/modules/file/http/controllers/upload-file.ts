import { FastifyReply } from 'fastify'

import { UploadFileRequest } from '@modules/file/http/schemas/upload-file'
import { makeUploadFileUseCase } from '@modules/file/use-cases/factories/make-upload-file'

export async function uploadFile(
  request: UploadFileRequest,
  reply: FastifyReply,
) {
  const { name, contentType } = request.body

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
