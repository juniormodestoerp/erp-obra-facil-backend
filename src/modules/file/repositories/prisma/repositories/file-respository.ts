import { PrismaClient } from '@prisma/client'

import { File } from '@modules/file/entities/file'
import { FileRepository } from '@modules/file/repositories/file-repository'
import { PrismaFileMapper } from '@modules/file/repositories/prisma/mappers/prisma-file-mapper'

import { prisma } from '@shared/infra/database/prisma'

export class PrismaFileRepository implements FileRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async findById(userId: string): Promise<File | undefined> {
    const file = await this.repository.file.findUnique({
      where: {
        id: userId,
      },
    })

    if (!file) {
      return undefined
    }

    return PrismaFileMapper.toDomain(file)
  }

  async create(file: File): Promise<File> {
    const prismaUserData = PrismaFileMapper.toPrisma(file)

    const createdFile = await this.repository.file.create({
      data: prismaUserData,
    })

    return PrismaFileMapper.toDomain(createdFile)
  }
}
