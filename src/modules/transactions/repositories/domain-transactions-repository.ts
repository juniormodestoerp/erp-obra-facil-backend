import type { IFindManyTransactionsDTO } from '@modules/transactions/dtos/find-many-transactions-dto'
import type { IFindTransactionByIdDTO } from '@modules/transactions/dtos/find-transaction-by-id-dto'
import type { IVerifyIfTransactionExistsDTO } from '@modules/transactions/dtos/verify-if-transaction-exists-dto-'
import type { Transaction } from '@modules/transactions/entities/transaction'

export interface DomainTransactionsRepository {
	findById({ userId, id }: IFindTransactionByIdDTO): Promise<Transaction | null>
	findMany({
		pageIndex,
		userId,
	}: IFindManyTransactionsDTO): Promise<Transaction[]>
	fetchAll({ userId }: { userId: string }): Promise<Transaction[]>
	count(searchTerm?: string): Promise<number>
	verifyIfExists({
		userId,
		date,
		amount,
		description,
	}: IVerifyIfTransactionExistsDTO): Promise<Transaction | null>
	create(transaction: Transaction): Promise<void>
	save(transaction: Transaction): Promise<void>
	remove({ userId, id }: IFindTransactionByIdDTO): Promise<void>
}
