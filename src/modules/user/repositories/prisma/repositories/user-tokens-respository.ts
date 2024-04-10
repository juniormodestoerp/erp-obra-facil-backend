import { PrismaClient } from '@prisma/client'

import { UserToken } from '@modules/user/entities/user-token'
import { UserTokensRepository } from '@modules/user/repositories/user-tokens-respository'
import { PrismaUserTokenMapper } from '@modules/user/repositories/prisma/mappers/prisma-user-tokens-mapper'

import { prisma } from '@shared/infra/database/prisma'

export class PrismaUserTokensRepository implements UserTokensRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.repository.userToken.findUnique({
      where: {
        token,
      },
    })

    if (!userToken) {
      return undefined
    }

    return PrismaUserTokenMapper.toDomain(userToken)
  }

  async create(userToken: UserToken): Promise<void> {
    const prismaUserToken = PrismaUserTokenMapper.toPrisma(userToken)

    await this.repository.userToken.create({
      data: {
        ...prismaUserToken,
      },
    })
  }

  async save(userToken: UserToken): Promise<void> {
    const prismaUserToken = PrismaUserTokenMapper.toPrisma(userToken)

    await this.repository.userToken.update({
      where: {
        id: prismaUserToken.id,
      },
      data: prismaUserToken,
    })
  }
}
