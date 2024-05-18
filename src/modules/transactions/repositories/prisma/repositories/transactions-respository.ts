import { PrismaClient } from '@prisma/client'

import { IFindManyDTO } from '@modules/transactions/dtos/find-many-transactions-dto'
import { IFindByIdDTO } from '@modules/transactions/dtos/find-transaction-by-id-dto'
import { Transaction } from '@modules/transactions/entities/transaction'
import { PrismaTransactionsMapper } from '@modules/transactions/repositories/prisma/mappers/prisma-transactions-mapper'
import { TransactionsRepository } from '@modules/transactions/repositories/transactions-repository'

import { env } from '@shared/infra/config/env'
import { prisma } from '@shared/infra/database/prisma'

export class PrismaTransactionsRepository implements TransactionsRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async findById({ id, userId }: IFindByIdDTO): Promise<Transaction | null> {
    const transaction = await this.repository.transaction.findUnique({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    })

    if (!transaction) {
      return null
    }

    return PrismaTransactionsMapper.toDomain(transaction)
  }

  async findMany({ pageIndex, userId }: IFindManyDTO): Promise<Transaction[]> {
    const skip = (pageIndex - 1) * env.PER_PAGE

    const transactions = await this.repository.transaction.findMany({
      where: {
        userId,
      },
      skip,
      take: env.PER_PAGE,
      orderBy: {
        updatedAt: 'desc',
      },
    })

    if (!transactions) {
      return []
    }

    return transactions.map((transaction) =>
      PrismaTransactionsMapper.toDomain(transaction),
    )
  }

  async count(): Promise<number> {
    return await this.repository.transaction.count()
  }

  async save(transaction: Transaction): Promise<void> {
    const prismaTransactionData = PrismaTransactionsMapper.toPrisma(transaction)

    await this.repository.transaction.upsert({
      where: {
        id: transaction.id,
        userId: transaction.userId,
      },
      create: prismaTransactionData,
      update: prismaTransactionData,
    })
  }

  async remove(id: string): Promise<void> {
    await this.repository.transaction.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
