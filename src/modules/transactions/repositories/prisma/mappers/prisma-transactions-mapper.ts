import { Transaction as RawTransaction } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { Transaction } from '@modules/transactions/entities/transaction'

export class PrismaTransactionsMapper {
  static toPrisma(transaction: Transaction) {
    return {
      id: transaction.id,
      userId: transaction.userId,
      transactionId: transaction.transactionId,
      categoryId: transaction.categoryId,
      name: transaction.name,
      description: transaction.description,
      transactionDate: transaction.transactionDate,
      status: transaction.status,
      establishmentName: transaction.establishmentName,
      bankName: transaction.bankName,
      paymentMethod: transaction.paymentMethod,
      previousBalance: transaction.previousBalance,
      totalAmount: transaction.totalAmount,
      currentBalance: transaction.currentBalance,
      competencyDate: transaction.competencyDate,
      costCenter: transaction.costCenter,
      tags: transaction.tags,
      enablePasswordProtection: transaction.enablePasswordProtection,
      installmentConfiguration: transaction.installmentConfiguration,
      includeResidualBalancesInReports:
        transaction.includeResidualBalancesInReports,
      documentNumber: transaction.documentNumber,
      enableReceiptExpenseGoals: transaction.enableReceiptExpenseGoals,
      associatedContracts: transaction.associatedContracts,
      associatedProjects: transaction.associatedProjects,
      additionalComments: transaction.additionalComments,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      deletedAt: transaction.deletedAt,
    }
  }

  static toDomain(raw: RawTransaction): Transaction {
    return Transaction.create(
      {
        userId: raw.userId,
        transactionId: raw.transactionId,
        categoryId: raw.categoryId,
        name: raw.name,
        description: raw.description,
        transactionDate: raw.transactionDate,
        status: raw.status,
        establishmentName: raw.establishmentName,
        bankName: raw.bankName,
        paymentMethod: raw.paymentMethod,
        previousBalance: raw.previousBalance,
        totalAmount: raw.totalAmount,
        currentBalance: raw.currentBalance,
        competencyDate: raw.competencyDate,
        costCenter: raw.costCenter,
        tags: raw.tags,
        enablePasswordProtection: raw.enablePasswordProtection,
        installmentConfiguration: raw.installmentConfiguration,
        includeResidualBalancesInReports: raw.includeResidualBalancesInReports,
        documentNumber: raw.documentNumber,
        enableReceiptExpenseGoals: raw.enableReceiptExpenseGoals,
        associatedContracts: raw.associatedContracts,
        associatedProjects: raw.associatedProjects,
        additionalComments: raw.additionalComments,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
