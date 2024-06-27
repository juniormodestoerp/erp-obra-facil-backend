import type { BankAccount as RawBankAccount } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import {
	BankAccount,
	LimitType,
} from '@modules/bank-accounts/entities/bank-account'

export class PrismaBankAccountsMapper {
	static toPrisma(bankAccount: BankAccount): RawBankAccount {
		return {
			id: bankAccount.id,
			userId: bankAccount.userId,
			accountType: bankAccount.accountType,
			name: bankAccount.name,
			currency: bankAccount.currency,
			logo: bankAccount.logo,
			limit: bankAccount.limit,
			limitType: bankAccount.limitType,
			dueDateDay: bankAccount.dueDateDay,
			dueDateFirstInvoice: bankAccount.dueDateFirstInvoice
				? new Date(bankAccount.dueDateFirstInvoice)
				: null,
			closingDateInvoice: bankAccount.closingDateInvoice,
			balanceFirstInvoice: bankAccount.balanceFirstInvoice,
			isFirstInvoice: bankAccount.isFirstInvoice,
			isCreditCard: bankAccount.isCreditCard,
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
				accountType: raw.accountType,
				name: raw.name,
				currency: raw.currency,
				logo: raw.logo,
				limit: raw.limit,
				limitType: LimitType[raw.limitType as keyof typeof LimitType],
				dueDateDay: raw.dueDateDay,
				dueDateFirstInvoice: raw.dueDateFirstInvoice
					? raw.dueDateFirstInvoice?.toISOString()
					: null,
				closingDateInvoice: raw.closingDateInvoice,
				balanceFirstInvoice: raw.balanceFirstInvoice,
				isFirstInvoice: raw.isFirstInvoice,
				isCreditCard: raw.isCreditCard,
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
