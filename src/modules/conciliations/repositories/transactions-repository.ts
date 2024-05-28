import type { IFindManyTransactionsDTO } from '@modules/transactions/dtos/find-many-transactions-dto'
import type { IFindTransactionByIdDTO } from '@modules/transactions/dtos/find-transaction-by-id-dto'
import type { Transaction } from '@modules/transactions/entities/transaction'

export interface TransactionsRepository {
	findById({ userId, id }: IFindTransactionByIdDTO): Promise<Transaction | null>
	findMany({
		pageIndex,
		userId,
	}: IFindManyTransactionsDTO): Promise<Transaction[]>
	count(searchTerm?: string): Promise<number>
	create(transaction: Transaction): Promise<void>
	save(transaction: Transaction): Promise<void>
	remove({ userId, id }: IFindTransactionByIdDTO): Promise<void>
}
