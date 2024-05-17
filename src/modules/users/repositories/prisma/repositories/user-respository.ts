import { PrismaClient } from '@prisma/client'

import { IFindManyDTO } from '@modules/users/dtos/find-many-dto'
import { User } from '@modules/users/entities/user'
import { PrismaUserMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-mapper'
import { UsersRepository } from '@modules/users/repositories/user-repository'

import { env } from '@shared/infra/config/env'
import { prisma } from '@shared/infra/database/prisma'

export class PrismaUsersRepository implements UsersRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.user.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByDocument(document: string): Promise<User | null> {
    const user = await this.repository.user.findUnique({
      where: {
        document,
        deletedAt: null,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.user.findUnique({
      where: {
        email,
        deletedAt: null,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await this.repository.user.findUnique({
      where: {
        phone,
        deletedAt: null,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findMany({ pageIndex, role }: IFindManyDTO): Promise<User[]> {
    const whereClauses: IFindManyDTO = {
      pageIndex,
      deletedAt: null,
    }
    if (role !== undefined) {
      whereClauses.role = role
    }

    const skip = (pageIndex - 1) * env.PER_PAGE

    const users = await this.repository.user.findMany({
      where: whereClauses,
      skip,
      take: env.PER_PAGE,
      orderBy: {
        updatedAt: 'desc',
      },
    })

    if (!users) {
      return []
    }

    return users.map((user) => PrismaUserMapper.toDomain(user))
  }

  async save(user: User): Promise<void> {
    const prismaUserData = PrismaUserMapper.toPrisma(user)

    await this.repository.user.upsert({
      where: {
        id: user.id,
      },
      create: prismaUserData,
      update: prismaUserData,
    })
  }

  async remove(id: string): Promise<void> {
    await this.repository.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
