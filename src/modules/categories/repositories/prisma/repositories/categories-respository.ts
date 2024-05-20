import { PrismaClient } from '@prisma/client'

import { IFindCategoryByIdDTO } from '@modules/categories/dtos/find-category-by-id-dto'
import { IFindCategoryByNameDTO } from '@modules/categories/dtos/find-category-by-name-dto'
import { IFindManyCategoriesDTO } from '@modules/categories/dtos/find-many-categories-dto'
import { Category } from '@modules/categories/entities/category'
import { CategoriesRepository } from '@modules/categories/repositories/categories-repository'
import { PrismaCategoriesMapper } from '@modules/categories/repositories/prisma/mappers/prisma-categories-mapper'

import { env } from '@shared/infra/config/env'
import { prisma } from '@shared/infra/database/prisma'

export class PrismaCategoriesRepository implements CategoriesRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async findById({
    userId,
    id,
  }: IFindCategoryByIdDTO): Promise<Category | null> {
    const category = await this.repository.category.findUnique({
      where: {
        userId,
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
    const category = await this.repository.category.findUnique({
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

  async findBySubcategoryName({
    userId,
    name,
  }: IFindCategoryByNameDTO): Promise<Category | null> {
    const category = await this.repository.category.findFirst({
      where: {
        userId,
        subcategory: name,
        deletedAt: null,
      },
    })

    if (!category) {
      return null
    }

    return PrismaCategoriesMapper.toDomain(category)
  }

  async findMany({
    pageIndex,
    userId,
  }: IFindManyCategoriesDTO): Promise<Category[]> {
    const skip = (pageIndex - 1) * env.PER_PAGE

    const categories = await this.repository.category.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      skip,
      take: env.PER_PAGE,
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

  async count(): Promise<number> {
    return await this.repository.category.count()
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
        userId: category.userId,
        id: category.id,
        deletedAt: null,
      },
      data: prismaCategoryData,
    })
  }

  async remove({ userId, id }: IFindCategoryByIdDTO): Promise<void> {
    await this.repository.category.delete({
      where: {
        userId,
        id,
        deletedAt: null,
      },
      // data: {
      //   deletedAt: new Date(),
      // },
    })
  }
}
