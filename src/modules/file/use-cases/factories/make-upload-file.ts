import { PrismaFileRepository } from '@modules/file/repositories/prisma/repositories/file-respository'

import { UploadFileUseCase } from '@modules/file/use-cases/upload-file'

export function makeUploadFileUseCase() {
  const filesRepository = new PrismaFileRepository()

  return new UploadFileUseCase(filesRepository)
}
