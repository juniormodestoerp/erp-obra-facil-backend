import { PrismaClient } from '@prisma/client'

import { User } from '@modules/users/entities/user'
import { PrismaUserMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-mapper'
import { UsersRepository } from '@modules/users/repositories/user-repository'

import { prisma } from '@shared/infra/database/prisma'
import { RedisCache } from '@shared/infra/providers/cache/redis'

export class PrismaUsersRepository implements UsersRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async findById(userId: string): Promise<User | undefined> {
    const user = await this.repository.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return undefined
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByDocument(document: string): Promise<User | undefined> {
    const user = await this.repository.user.findFirst({
      where: {
        document,
      },
    })

    if (!user) {
      return undefined
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return undefined
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByPhone(phone: string): Promise<User | undefined> {
    const user = await this.repository.user.findFirst({
      where: {
        phone,
      },
    })

    if (!user) {
      return undefined
    }

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const prismaUserData = PrismaUserMapper.toPrisma(user)

    await this.repository.user.create({
      data: prismaUserData,
    })
  }

  async save(user: User): Promise<void> {
    const prismaUserData = PrismaUserMapper.toPrisma(user)

    await this.repository.user.update({
      where: {
        id: prismaUserData.id,
      },
      data: prismaUserData,
    })

    RedisCache.getInstance().delete(`user:${user.id}`)
  }
}

// async delete(): Promise<void> {}
