import { File as RawFile } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { File } from '@modules/file/entities/file'

export class PrismaFileMapper {
  static toPrisma(file: File) {
    return {
      id: file.id,
      key: file.key,
      name: file.name,
      contentType: file.contentType,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
      deletedAt: file.deletedAt,
    }
  }

  static toDomain(raw: RawFile): File {
    return File.create(
      {
        key: raw.key,
        name: raw.name,
        contentType: raw.contentType,
        createdAt: raw.createdAt,
        updatedAt: raw.createdAt,
        deletedAt: raw.createdAt ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
