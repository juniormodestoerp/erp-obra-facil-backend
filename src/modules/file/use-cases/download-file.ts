import { GetObjectAclCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { AppError } from '@core/domain/errors/app-error'

import { FileRepository } from '@modules/file/repositories/file-repository'

import { env } from '@shared/infra/config/env'
import { r2 } from '@shared/infra/providers/storage/cloudflare'

interface Input {
  id: string
}

interface Output {
  signedUrl: string
}

export class DownloadFileUseCase {
  constructor(private readonly fileRepository: FileRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const file = await this.fileRepository.findById(id)
    if (!file) {
      throw new AppError({
        code: 'file.not_found',
      })
    }

    const signedUrl = await getSignedUrl(
      r2,
      new GetObjectAclCommand({
        Bucket: env.BUCKET_NAME,
        Key: file.key,
      }),
      { expiresIn: 60 * 60 }, // 1 hour
    )

    return {
      signedUrl,
    }
  }
}
