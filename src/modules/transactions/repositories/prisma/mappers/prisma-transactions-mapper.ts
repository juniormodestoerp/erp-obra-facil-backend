import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Transaction } from '@modules/transactions/entities/transaction'
import type { Transaction as RawTransaction } from '@prisma/client'

export class PrismaTransactionsMapper {
	static toPrisma(transaction: Transaction) {
		return {
			id: transaction.id,
			userId: transaction.userId,
			fitId: transaction.fitId,
			accountType: transaction.accountType,
			name: transaction.name,
			description: transaction.description,
			categoryId: transaction.categoryId,
			establishmentName: transaction.establishmentName,
			bankName: transaction.bankName,
			transactionDate: transaction.transactionDate,
			previousBalance: transaction.previousBalance,
			totalAmount: transaction.totalAmount,
			currentBalance: transaction.currentBalance,
			paymentMethod: transaction.paymentMethod,
			competencyDate: transaction.competencyDate,
			costAndProfitCenters: transaction.costAndProfitCenters,
			tags: transaction.tags,
			documentNumber: transaction.documentNumber,
			associatedContracts: transaction.associatedContracts,
			associatedProjects: transaction.associatedProjects,
			additionalComments: transaction.additionalComments,
			status: transaction.status,
			accountToTransfer: transaction.accountToTransfer,
			contact: transaction.contact,
			card: transaction.card,
			createdAt: transaction.createdAt,
			updatedAt: transaction.updatedAt,
			deletedAt: transaction.deletedAt,
		}
	}

	static toDomain(
		raw: RawTransaction & {
			category?: {
				id: string
				name: string
			}
		},
	): Transaction {
		return Transaction.create(
			{
				userId: raw.userId,
				fitId: raw.fitId,
				name: raw.name,
				accountType: raw.accountType,
				description: raw.description,
				categoryId: raw.categoryId,
				categoryName: raw.category?.name,
				establishmentName: raw.establishmentName,
				bankName: raw.bankName,
				transactionDate: raw.transactionDate,
				previousBalance: raw.previousBalance,
				totalAmount: raw.totalAmount,
				currentBalance: raw.currentBalance,
				paymentMethod: raw.paymentMethod,
				competencyDate: raw.competencyDate,
				costAndProfitCenters: raw.costAndProfitCenters,
				tags: raw.tags,
				documentNumber: raw.documentNumber,
				associatedContracts: raw.associatedContracts,
				associatedProjects: raw.associatedProjects,
				additionalComments: raw.additionalComments,
				status: raw.status,
				accountToTransfer: raw.accountToTransfer,
				contact: raw.contact,
				card: raw.card,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				deletedAt: raw.deletedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
