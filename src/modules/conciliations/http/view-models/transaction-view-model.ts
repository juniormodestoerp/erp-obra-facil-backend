import type { Transaction } from '@modules/transactions/entities/transaction'

export class TransactionViewModel {
	static toHTTP(transaction: Transaction) {
		return {
			id: transaction.id,
			date: transaction.date?.toISOString(),
			amount: transaction.amount,
			description: transaction.description,
			transferAccount: transaction.transferAccount,
			card: transaction.card,
			contact: transaction.contact,
			project: transaction.project,
			documentNumber: transaction.documentNumber,
			notes: transaction.notes,
			competenceDate: transaction.competenceDate?.toISOString(),
			account: transaction.account,
			category: transaction.category,
			center: transaction.center,
			method: transaction.method,
			tags: transaction.tags,
			createdAt: transaction.createdAt?.toISOString(),
		}
	}
}
