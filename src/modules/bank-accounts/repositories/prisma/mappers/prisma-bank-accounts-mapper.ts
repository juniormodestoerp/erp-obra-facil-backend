import type { BankAccount as RawBankAccount } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { BankAccount } from '@modules/bank-accounts/entities/bank-account'

export class PrismaBankAccountsMapper {
	static toPrisma(bankAccount: BankAccount): RawBankAccount {
		return {
			id: bankAccount.id,
			userId: bankAccount.userId,
			name: bankAccount.name,
			currency: bankAccount.currency,
			logo: bankAccount.logo,
			initialBalance: bankAccount.initialBalance,
			createdAt: bankAccount.createdAt,
			updatedAt: bankAccount.updatedAt,
			deletedAt: bankAccount.deletedAt,
		}
	}

	static toDomain(raw: RawBankAccount): BankAccount {
		return BankAccount.create(
			{
				userId: raw.userId,
				name: raw.name,
				currency: raw.currency,
				logo: raw.logo,
				initialBalance: raw.initialBalance,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				deletedAt: raw.deletedAt,
				user: null,
				transactions: [],
			},
			new UniqueEntityID(raw.id),
		)
	}
}
