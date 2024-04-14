import { PrismaFileRepository } from '@modules/file/repositories/prisma/repositories/file-respository'

import { DownloadFileUseCase } from '@modules/file/use-cases/download-file'

export function makeDownloadFileUseCase() {
  const filesRepository = new PrismaFileRepository()

  return new DownloadFileUseCase(filesRepository)
}
