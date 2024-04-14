import { randomUUID } from 'node:crypto'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { FileRepository } from '@modules/file/repositories/file-repository'

import { env } from '@shared/infra/config/env'
import { prisma } from '@shared/infra/database/prisma'
import { r2 } from '@shared/infra/providers/storage/cloudflare'

interface Input {
  name: string
  contentType: string
}

interface Output {
  file: string
  signedUrl: string
}

export class UploadFileUseCase {
  constructor(private readonly fileRepository: FileRepository) {}

  async execute({ name, contentType }: Input): Promise<Output> {
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

    return {
      file: file.id,
      signedUrl,
    }
  }
}
