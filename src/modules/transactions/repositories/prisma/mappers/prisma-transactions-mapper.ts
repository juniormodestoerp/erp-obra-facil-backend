import { Transaction as RawTransaction } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { Transaction } from '@modules/transactions/entities/transaction'

export class PrismaTransactionsMapper {
  static toPrisma(transaction: Transaction) {
    return {
      id: transaction.id,
      userId: transaction.userId,
      transactionId: transaction.transactionId,
      name: transaction.name,
      description: transaction.description,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      deletedAt: transaction.deletedAt,
    }
  }

  static toDomain(raw: RawTransaction): Transaction {
    return Transaction.create(
      {
        userId: raw.userId,
        transactionId: raw.transactionId ?? undefined,
        name: raw.name,
        description: raw.description ?? undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.createdAt,
        deletedAt: raw.createdAt ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
