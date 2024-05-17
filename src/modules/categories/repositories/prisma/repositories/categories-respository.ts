import { PrismaClient } from '@prisma/client'

import { IFindByIdDTO } from '@modules/categories/dtos/find-by-id-dto'
import { IFindManyDTO } from '@modules/categories/dtos/find-many-dto'
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

  async findById({ id, userId }: IFindByIdDTO): Promise<Category | null> {
    const category = await this.repository.category.findUnique({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    })

    if (!category) {
      return null
    }

    return PrismaCategoriesMapper.toDomain(category)
  }

  async findMany({ pageIndex, userId }: IFindManyDTO): Promise<Category[]> {
    const skip = (pageIndex - 1) * env.PER_PAGE

    const categories = await this.repository.category.findMany({
      where: {
        userId,
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

  async save(category: Category): Promise<Category> {
    const prismaCategoryData = PrismaCategoriesMapper.toPrisma(category)

    const prismaCategory = await this.repository.category.upsert({
      where: {
        id: category.id,
        userId: category.userId,
      },
      create: prismaCategoryData,
      update: prismaCategoryData,
    })

    return PrismaCategoriesMapper.toDomain(prismaCategory)
  }

  async remove(id: string): Promise<void> {
    await this.repository.category.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
