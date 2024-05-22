import { AppError } from '@core/domain/errors/app-error'

import { Transaction } from '@modules/transactions/entities/transaction'
import { TransactionsRepository } from '@modules/transactions/repositories/transactions-repository'
import { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
  userId: string
  name: string
  description: string
  categoryId: string
  establishmentName: string
  bankName: string
  transactionDate: Date
  previousBalance: number
  totalAmount: number
  currentBalance: number
  paymentMethod: string
  // Additional optional configurations
  competencyDate: Date | null
  costAndProfitCenters: string | null
  tags: string | null
  documentNumber: string | null
  associatedContracts: string | null
  associatedProjects: string | null
  additionalComments: string | null
}

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    name,
    description,
    categoryId,
    establishmentName,
    bankName,
    transactionDate,
    previousBalance,
    totalAmount,
    currentBalance,
    paymentMethod,
    // Additional optional configurations
    competencyDate,
    costAndProfitCenters,
    tags,
    documentNumber,
    associatedContracts,
    associatedProjects,
    additionalComments,
  }: Input): Promise<void> {
    const user = await this.usersRepository.findById({
      userId,
    })

    if (!user) {
      throw new AppError({
        code: 'user.not_found',
      })
    }

    const transaction = Transaction.create({
      userId,
      name,
      description,
      categoryId: '4fdf8ff9-6e93-400e-b214-f9c547b2daf4',
      establishmentName,
      bankName,
      transactionDate,
      previousBalance,
      totalAmount,
      currentBalance,
      paymentMethod,
      // Additional optional configurations
      competencyDate,
      costAndProfitCenters,
      tags,
      documentNumber,
      associatedContracts,
      associatedProjects,
      additionalComments,
      status: 'pending',
    })

    await this.transactionsRepository.create(transaction)
  }
}
