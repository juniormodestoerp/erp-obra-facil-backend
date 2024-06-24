import type { PrismaClient } from '@prisma/client'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { Tag } from '@modules/tags/entities/tag'
import type { TagsRepository } from '@modules/tags/repositories/tags-repository'
import { PrismaTagsMapper } from '@modules/tags/repositories/prisma/mappers/prisma-tags-mapper'

import { prisma } from '@shared/infra/database/prisma'

export class PrismaTagsRepository implements TagsRepository {
	private repository: PrismaClient

	constructor() {
		this.repository = prisma
	}

	async findById(id: string): Promise<Tag | null> {
		const tag = await this.repository.tag.findUnique({
			where: {
				id,
				deletedAt: null,
			},
		})

		if (!tag) {
			return null
		}

		return PrismaTagsMapper.toDomain(tag)
	}

	async findByName(name: string): Promise<Tag | null> {
		const tag = await this.repository.tag.findFirst({
			where: {
				name,
				deletedAt: null,
			},
		})

		if (!tag) {
			return null
		}

		return PrismaTagsMapper.toDomain(tag)
	}

	async findMany(userId: string): Promise<Tag[]> {
		const tags = await this.repository.tag.findMany({
			where: {
				userId,
				deletedAt: null,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		})

		if (!tags) {
			return []
		}

		return tags.map((tag) =>
			PrismaTagsMapper.toDomain(tag),
		)
	}

	async selectInput(): Promise<ISelectInputDTO[]> {
		const tags = await this.repository.tag.findMany({
			where: {
				deletedAt: null,
			},
			orderBy: {
				updatedAt: 'desc',
			},
			select: {
				id: true,
				name: true,
			},
		})

		if (!tags) {
			return []
		}

		return tags.map((tag) => {
			return {
				field: tag.name,
				value: tag.id,
			}
		})
	}

	async create(tag: Tag): Promise<void> {
		const prismaTagData = PrismaTagsMapper.toPrisma(tag)

		await this.repository.tag.create({
			data: prismaTagData,
		})
	}

	async save(tag: Tag): Promise<void> {
		const prismaTagData = PrismaTagsMapper.toPrisma(tag)

		await this.repository.tag.update({
			where: {
				id: tag.id,
				deletedAt: null,
			},
			data: prismaTagData,
		})
	}

	async remove(id: string): Promise<void> {
		await this.repository.tag.delete({
			where: {
				id,
				deletedAt: null,
			},
		})
	}
}
