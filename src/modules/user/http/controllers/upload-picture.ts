import { randomUUID } from 'node:crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { z } from 'zod'

import { strMessage } from '@core/utils/custom-zod-error'

import { env } from '@shared/infra/config/env'
import { r2 } from '@shared/infra/providers/storage/cloudflare'
import { prisma } from '@shared/infra/database/prisma'

const bodySchema = z.object({
  name: z.string(strMessage('nome')).min(1, 'O campo nome é obrigatório.'),
  contentType: z
    .string(strMessage('tipo de conteúdo'))
    .regex(/\w+\/[-+.\w]+/, {
      message: 'O tipo de conteúdo deve ser válido.',
    })
    .min(1, 'O campo tipo de conteúdo é obrigatório.'),
})

export async function uploadPicture(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, contentType } = bodySchema.parse(request.body)

  const fileKey = randomUUID().concat('-').concat(name)

  const signedUrl = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: env.BUCKET_NAME,
      Key: fileKey,
      ContentType: contentType,
    }),
    { expiresIn: 60 * 60 }, // 1 hour
  )

  const file = await prisma.file.create({
    data: {
      key: fileKey,
      name,
      contentType,
    },
  })

  return reply.status(200).send({
    file: file.id,
    signedUrl,
  })
}
