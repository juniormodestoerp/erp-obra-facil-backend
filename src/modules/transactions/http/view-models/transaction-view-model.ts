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
			account: transaction.account.name,
			category: transaction.category?.name,
			subcategory: transaction.category?.subcategoryOf,
			center: transaction.center?.name,
			method: transaction.method?.name,
			tags: transaction.tags.map((tag) => tag.name),
			createdAt: transaction.createdAt?.toISOString(),
		}
	}
}
