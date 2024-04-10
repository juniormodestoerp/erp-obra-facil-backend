import { GetObjectAclCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { env } from '@shared/infra/config/env'
import { prisma } from '@shared/infra/database/prisma'
import { r2 } from '@shared/infra/providers/storage/cloudflare'

const paramsSchema = z.object({
  id: z
    .string(strMessage('id'))
    .uuid({ message: 'O campo id deve ser um UUID válido.' })
    .min(1, 'O campo id é obrigatório.'),
})

export async function dowloadPicture(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)

  const file = await prisma.file.findUnique({
    where: {
      id,
    },
  })

  const signedUrl = await getSignedUrl(
    r2,
    new GetObjectAclCommand({
      Bucket: env.BUCKET_NAME,
      Key: file.key,
    }),
    { expiresIn: 60 * 60 }, // 1 hour
  )

  return reply.status(200).send({
    signedUrl,
  })
}
