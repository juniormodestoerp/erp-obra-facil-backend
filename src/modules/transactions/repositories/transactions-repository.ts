import { IFindByIdDTO } from '@modules/transactions/dtos/find-by-id-dto'
import { IFindManyDTO } from '@modules/transactions/dtos/find-many-dto'
import { Transaction } from '@modules/transactions/entities/transaction'

export interface TransactionsRepository {
  findById({ id, userId }: IFindByIdDTO): Promise<Transaction | null>
  findMany({ pageIndex, userId }: IFindManyDTO): Promise<Transaction[]>
  count(): Promise<number>
  save(contact: Transaction): Promise<void>
  remove(id: string): Promise<void>
}
