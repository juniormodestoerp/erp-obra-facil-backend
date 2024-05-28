import { AppError } from '@core/domain/errors/app-error'

import { Category } from '@modules/categories/entities/category'
import type { CategoriesRepository } from '@modules/categories/repositories/categories-repository'

interface Input {
	userId: string
	categoryId?: string
	name: string
	subcategory?: string
	model: string
	type: string
}

interface Output {
	category: Category
}

export class CreateCategoryUseCase {
	constructor(private readonly categoriesRepository: CategoriesRepository) {}

	async execute({
		userId,
		categoryId,
		name,
		subcategory,
		model,
		type,
	}: Input): Promise<Output> {
		if (!subcategory) {
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
					name: subcategory,
				})

			if (subcategoryExists) {
				throw new AppError({
					code: 'subcategory.already_exists',
				})
			}
		}

		const parentId = await this.categoriesRepository.findByName({
			userId,
			name,
		})

		const id = parentId?.id ?? categoryId

		const category = Category.create({
			userId,
			categoryId: id ?? undefined,
			name: subcategory || name,
			subcategory: subcategory ? name : null,
			model,
			type,
		})

		await this.categoriesRepository.create(category)

		return {
			category,
		}
	}
}
