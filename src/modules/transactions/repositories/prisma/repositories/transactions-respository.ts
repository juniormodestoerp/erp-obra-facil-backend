import { PrismaClient } from '@prisma/client'

import { IFindTransactionByIdDTO } from '@modules/transactions/dtos/find-transaction-by-id-dto'
import {
  IFindManyTransactionsDTO,
  ITransactionsWhereClauses,
} from '@modules/transactions/dtos/find-many-transactions-dto'
import { Transaction } from '@modules/transactions/entities/transaction'
import { TransactionsRepository } from '@modules/transactions/repositories/transactions-repository'
import { PrismaTransactionsMapper } from '@modules/transactions/repositories/prisma/mappers/prisma-transactions-mapper'

import { env } from '@shared/infra/config/env'
import { prisma } from '@shared/infra/database/prisma'

export class PrismaTransactionsRepository implements TransactionsRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async findById({
    userId,
    id,
  }: IFindTransactionByIdDTO): Promise<Transaction | null> {
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

  async findMany({
    pageIndex,
    userId,
    searchTerm,
  }: IFindManyTransactionsDTO): Promise<Transaction[]> {
    const skip = pageIndex * env.PER_PAGE

    const whereClauses: ITransactionsWhereClauses = {
      userId,
      deletedAt: null,
    }

    if (searchTerm) {
      whereClauses.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { categoryId: { contains: searchTerm, mode: 'insensitive' } },
        { establishmentName: { contains: searchTerm, mode: 'insensitive' } },
        { bankName: { contains: searchTerm, mode: 'insensitive' } },
        { paymentMethod: { contains: searchTerm, mode: 'insensitive' } },
        { status: { contains: searchTerm, mode: 'insensitive' } },
      ]
    }

    const transactions = await this.repository.transaction.findMany({
      where: whereClauses,
      skip,
      take: env.PER_PAGE,
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!transactions) {
      return []
    }

    return transactions.map((transaction) =>
      PrismaTransactionsMapper.toDomain(transaction),
    )
  }

  async count(searchTerm: string): Promise<number> {
    const whereClauses: ITransactionsWhereClauses = {
      deletedAt: null,
    }

    if (searchTerm) {
      whereClauses.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { categoryId: { contains: searchTerm, mode: 'insensitive' } },
        { establishmentName: { contains: searchTerm, mode: 'insensitive' } },
        { bankName: { contains: searchTerm, mode: 'insensitive' } },
        { paymentMethod: { contains: searchTerm, mode: 'insensitive' } },
        { status: { contains: searchTerm, mode: 'insensitive' } },
      ]
    }

    return await this.repository.transaction.count({
      where: whereClauses,
    })
  }

  async create(transaction: Transaction): Promise<void> {
    const prismaTransactionData = PrismaTransactionsMapper.toPrisma(transaction)

    await this.repository.transaction.create({
      data: prismaTransactionData,
    })
  }

  async save(transaction: Transaction): Promise<void> {
    const prismaTransactionData = PrismaTransactionsMapper.toPrisma(transaction)

    await this.repository.transaction.update({
      where: {
        userId: transaction.userId,
        id: transaction.id,
      },
      data: prismaTransactionData,
    })
  }

  async remove({ userId, id }: IFindTransactionByIdDTO): Promise<void> {
    await this.repository.transaction.update({
      where: {
        userId,
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
