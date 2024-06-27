import type { Transaction } from '@modules/transactions/entities/transaction'

export class TransactionViewModel {
	static toHTTP(transaction: Transaction) {
		return {
			id: transaction.id,
			userId: transaction.userId,
			name: transaction.name,
			description: transaction.description,
			categoryId: transaction.categoryId,
			categoryName: transaction.categoryName,
			establishmentName: transaction.establishmentName,
			bankName: transaction.bankName,
			date: transaction.date.toISOString(),
			previousBalance: transaction.previousBalance,
			amount: transaction.amount,
			currentBalance: transaction.currentBalance,
			paymentMethod: transaction.paymentMethod,
			competencyDate: transaction.competencyDate
				? transaction.competencyDate.toISOString()
				: null,
			costAndProfitCenters: transaction.costAndProfitCenters,
			tags: transaction.tags,
			documentNumber: transaction.documentNumber,
			associatedContracts: transaction.associatedContracts,
			associatedProjects: transaction.associatedProjects,
			additionalComments: transaction.additionalComments,
			status: transaction.status,
			createdAt: transaction.createdAt.toISOString(),
		}
	}
}
