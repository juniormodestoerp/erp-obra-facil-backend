import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { IFindAccountByNameDTO } from '@modules/accounts/dtos/find-account-by-name-dto'
import type { Account } from '@modules/accounts/entities/account'

export interface DomainAccountsRepository {
	findById(id: string): Promise<Account | null>
	findByName({ userId, name }: IFindAccountByNameDTO): Promise<Account | null>
	findMany(userId: string): Promise<Account[]>
	selectInput(): Promise<ISelectInputDTO[]>
	create(account: Account): Promise<void>
	save(account: Account): Promise<void>
	remove(id: string): Promise<void>
}
