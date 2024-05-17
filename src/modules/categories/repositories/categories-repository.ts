import { IFindByIdDTO } from '@modules/categories/dtos/find-by-id-dto'
import { IFindManyDTO } from '@modules/categories/dtos/find-many-dto'
import { Category } from '@modules/categories/entities/category'

export interface CategoriesRepository {
  findById({ id, userId }: IFindByIdDTO): Promise<Category | null>
  findMany({ pageIndex, userId }: IFindManyDTO): Promise<Category[]>
  count(): Promise<number>
  save(contact: Category): Promise<void>
  remove(id: string): Promise<void>
}
