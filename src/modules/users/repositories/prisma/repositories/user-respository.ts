import { PrismaClient } from '@prisma/client'

import { IFindUserByIdDTO } from '@modules/users/dtos/find-user-by-id-dto'
import { IFindManyUsersDTO } from '@modules/users/dtos/find-many-users-dto'
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

  async findById({ userId }: IFindUserByIdDTO): Promise<User | null> {
    const user = await this.repository.user.findUnique({
      where: {
        id: userId,
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

  async findMany({ pageIndex, role }: IFindManyUsersDTO): Promise<User[]> {
    const skip = (pageIndex - 1) * env.PER_PAGE

    const users = await this.repository.user.findMany({
      where: {
        role,
        deletedAt: null,
      },
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

  async create(user: User): Promise<void> {
    const prismaUserData = PrismaUserMapper.toPrisma(user)

    await this.repository.user.create({
      data: prismaUserData,
      include: {
        settings: true,
      },
    })
  }

  async save(user: User): Promise<void> {
    const prismaUserData = PrismaUserMapper.toPrisma(user)

    await this.repository.user.update({
      where: {
        id: user.id.toString(),
      },
      data: prismaUserData,
    })
  }

  async remove({ userId }: IFindUserByIdDTO): Promise<void> {
    await this.repository.user.update({
      where: {
        id: userId,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
