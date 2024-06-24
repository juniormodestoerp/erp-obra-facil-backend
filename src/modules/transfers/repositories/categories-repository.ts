import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { IFindCategoryByNameDTO } from '@modules/categories/dtos/find-category-by-name-dto'
import type { Category } from '@modules/categories/entities/category'

export interface CategoriesRepository {
	findById(id: string): Promise<Category | null>
	findByName({ userId, name }: IFindCategoryByNameDTO): Promise<Category | null>
	findBySubcategoryName({
		userId,
		name,
	}: IFindCategoryByNameDTO): Promise<Category | null>
	findMany(userId: string): Promise<Category[]>
	selectInput(): Promise<ISelectInputDTO[]>
	create(category: Category): Promise<void>
	save(category: Category): Promise<void>
	remove(id: string): Promise<void>
}
