import { AppError } from '@core/domain/errors/app-error'

import {
	Category,
	type CategoryType,
} from '@modules/categories/entities/category'
import type { CategoriesRepository } from '@modules/categories/repositories/categories-repository'

interface Input {
	userId: string
	type: CategoryType
	name: string
	subcategoryOf: string | null
}

interface Output {
	category: Category
}

export class CreateCategoryUseCase {
	constructor(private readonly categoriesRepository: CategoriesRepository) {}

	async execute({ userId, type, name, subcategoryOf }: Input): Promise<Output> {
		console.log({ userId, type, name, subcategoryOf })

		if (subcategoryOf === null) {
			const existsCategory = await this.categoriesRepository.findByName({
				userId,
				name,
			})

			if (existsCategory) {
				throw new AppError({
					code: 'category.already_exists',
				})
			}
		} else {
			const subcategoryExists =
				await this.categoriesRepository.findBySubcategoryName({
					userId,
					name,
				})

			if (subcategoryExists) {
				throw new AppError({
					code: 'subcategory.already_exists',
				})
			}
		}

		const category = Category.create({
			userId,
			transactionId: null,
			type,
			name,
			subcategoryOf,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			user: null,
			transactions: [],
		})

		await this.categoriesRepository.create(category)

		return {
			category,
		}
	}
}
