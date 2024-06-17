import type { File as RawFile } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { File } from '@modules/users/entities/file'

export class PrismaUserFilesMapper {
	static toPrisma(file: File) {
		return {
			id: file.id,
			userId: file.userId,
			path: file.path,
			name: file.name,
			contentType: file.contentType,
			createdAt: file.createdAt,
			updatedAt: file.updatedAt,
			deletedAt: file.deletedAt ?? null,
		}
	}

	static toDomain(raw: RawFile): File {
		return File.create(
			{
				userId: raw.userId,
				path: raw.path,
				name: raw.name,
				contentType: raw.contentType,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				deletedAt: raw.deletedAt ?? null,
				user: null,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
