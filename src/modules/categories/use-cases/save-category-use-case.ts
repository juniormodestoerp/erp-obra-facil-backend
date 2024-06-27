import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import {
	Category,
	type CategoryType,
} from '@modules/categories/entities/category'
import type { DomainCategoriesRepository } from '@modules/categories/repositories/domain-categories-repository'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'

interface Input {
	id: string
	userId: string
	type: CategoryType
	name: string
	subcategoryOf: string | null
}

interface Output {
	category: Category
}

export class SaveCategoryUseCase {
	constructor(
		private readonly categoriesRepository: DomainCategoriesRepository,
		private readonly usersRepository: DomainUsersRepository,
	) {}

	async execute({
		id,
		userId,
		type,
		name,
		subcategoryOf,
	}: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const previusCategory = await this.categoriesRepository.findById(id)

		if (!previusCategory) {
			throw new AppError({
				code: 'category.not_found',
			})
		}

		const category = Category.create(
			{
				userId,
				transactionId: previusCategory.transactionId ?? null,
				type,
				name,
				subcategoryOf,
				createdAt: previusCategory.createdAt,
				updatedAt: new Date(),
				deletedAt: previusCategory.deletedAt,
				user,
				transactions: previusCategory.transactions,
			},
			new UniqueEntityID(id),
		)

		await this.categoriesRepository.save(category)

		return {
			category,
		}
	}
}
