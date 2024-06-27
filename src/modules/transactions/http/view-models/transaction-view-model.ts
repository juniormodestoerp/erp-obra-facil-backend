import type { Transaction } from '@modules/transactions/entities/transaction'

export class TransactionViewModel {
	static toHTTP(transaction: Transaction) {
		return {
			id: transaction.id,
			type: transaction.type,
			date: transaction.date?.toISOString(),
			amount: transaction.amount,
			description: transaction.description,
			status: transaction.status,
			card: transaction.card,
			contact: transaction.contact,
			project: transaction.project,
			documentNumber: transaction.documentNumber,
			notes: transaction.notes,
			competenceDate: transaction.competenceDate?.toISOString(),
			account: transaction.account?.name,
			category: transaction.category?.name,
			subcategory: transaction.category?.subcategoryOf,
			center: transaction.center?.name,
			method: transaction.method?.name,
			tags: transaction.tag,
			createdAt: transaction.createdAt?.toISOString(),
		}
	}
}
