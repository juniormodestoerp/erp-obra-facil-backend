import type { PrismaClient } from '@prisma/client'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { IFindCategoryByNameDTO } from '@modules/categories/dtos/find-category-by-name-dto'
import type { Category } from '@modules/categories/entities/category'
import type { CategoriesRepository } from '@modules/categories/repositories/categories-repository'
import { PrismaCategoriesMapper } from '@modules/categories/repositories/prisma/mappers/prisma-categories-mapper'

import { prisma } from '@shared/infra/database/prisma'

export class PrismaCategoriesRepository implements CategoriesRepository {
	private repository: PrismaClient

	constructor() {
		this.repository = prisma
	}

	async findById(id: string): Promise<Category | null> {
		const category = await this.repository.category.findUnique({
			where: {
				id,
				deletedAt: null,
			},
		})

		if (!category) {
			return null
		}

		return PrismaCategoriesMapper.toDomain(category)
	}

	async findByName({
		userId,
		name,
	}: IFindCategoryByNameDTO): Promise<Category | null> {
		const category = await this.repository.category.findFirst({
			where: {
				userId,
				name,
				deletedAt: null,
			},
		})

		console.log('category', category)

		if (!category) {
			return null
		}

		return PrismaCategoriesMapper.toDomain(category)
	}

	async findBySubcategoryName({
		userId,
		name,
	}: IFindCategoryByNameDTO): Promise<Category | null> {
		const category = await this.repository.category.findFirst({
			where: {
				userId,
				name,
				deletedAt: null,
			},
		})

		if (!category) {
			return null
		}

		return PrismaCategoriesMapper.toDomain(category)
	}

	async findMany(userId: string): Promise<Category[]> {
		const categories = await this.repository.category.findMany({
			where: {
				userId,
				deletedAt: null,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		})

		if (!categories) {
			return []
		}

		return categories.map((category) =>
			PrismaCategoriesMapper.toDomain(category),
		)
	}

	async selectInput(): Promise<ISelectInputDTO[]> {
		const categories = await this.repository.category.findMany({
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

		if (!categories) {
			return []
		}

		return categories.map((category) => {
			return {
				field: category.name,
				value: category.id,
			}
		})
	}

	async create(category: Category): Promise<void> {
		const prismaCategoryData = PrismaCategoriesMapper.toPrisma(category)

		await this.repository.category.create({
			data: prismaCategoryData,
		})
	}

	async save(category: Category): Promise<void> {
		const prismaCategoryData = PrismaCategoriesMapper.toPrisma(category)

		await this.repository.category.update({
			where: {
				id: category.id,
				deletedAt: null,
			},
			data: prismaCategoryData,
		})
	}

	async remove(id: string): Promise<void> {
		await this.repository.category.delete({
			where: {
				id,
				deletedAt: null,
			},
		})
	}
}
