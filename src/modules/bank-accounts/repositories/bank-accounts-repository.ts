import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { IFindBankAccountByNameDTO } from '@modules/bank-accounts/dtos/find-bank-account-by-name-dto'
import type { BankAccount } from '@modules/bank-accounts/entities/bank-account'

export interface BankAccountsRepository {
	findById(id: string): Promise<BankAccount | null>
	findByName({
		userId,
		name,
	}: IFindBankAccountByNameDTO): Promise<BankAccount | null>
	findMany(userId: string): Promise<BankAccount[]>
	selectInput(): Promise<ISelectInputDTO[]>
	create(bankAccount: BankAccount): Promise<void>
	save(bankAccount: BankAccount): Promise<void>
	remove(id: string): Promise<void>
}
