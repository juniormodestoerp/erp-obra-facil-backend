import { FastifyReply } from 'fastify'

import { DownloadFileRequest } from '@modules/file/http/schemas/download-file'
import { makeDownloadFileUseCase } from '@modules/file/use-cases/factories/make-download-file'

export async function downloadFile(
  request: DownloadFileRequest,
  reply: FastifyReply,
) {
  const { id } = request.params

  const downloadFileUseCase = makeDownloadFileUseCase()

  const { signedUrl } = await downloadFileUseCase.execute({
    id,
  })

  return reply.status(200).send({
    signedUrl,
  })
}
