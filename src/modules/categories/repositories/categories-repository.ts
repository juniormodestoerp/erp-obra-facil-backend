import type { IFindCategoryByIdDTO } from '@modules/categories/dtos/find-category-by-id-dto'
import type { IFindCategoryByNameDTO } from '@modules/categories/dtos/find-category-by-name-dto'
import type { IFindManyCategoriesDTO } from '@modules/categories/dtos/find-many-categories-dto'
import type { ISelectInputDTO } from '@modules/categories/dtos/select-input-dto'
import type { Category } from '@modules/categories/entities/category'

export interface CategoriesRepository {
	findById({ userId, id }: IFindCategoryByIdDTO): Promise<Category | null>
	findByName({ userId, name }: IFindCategoryByNameDTO): Promise<Category | null>
	findBySubcategoryName({
		userId,
		name,
	}: IFindCategoryByNameDTO): Promise<Category | null>
	findMany({ pageIndex, userId }: IFindManyCategoriesDTO): Promise<Category[]>
	selectInput(): Promise<ISelectInputDTO[]>
	count(): Promise<number>
	create(contact: Category): Promise<void>
	save(contact: Category): Promise<void>
	remove({ userId, id }: IFindCategoryByIdDTO): Promise<void>
}
