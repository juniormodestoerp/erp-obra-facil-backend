import type { BankAccount } from '@modules/bank-accounts/entities/bank-account'

export class BankAccountsViewModel {
	static toHTTP(bankAccount: BankAccount) {
		return {
			id: bankAccount.id,
			userId: bankAccount.userId,
			bankAccountName: bankAccount.name,
			currency: bankAccount.currency,
			logo: bankAccount.logo,
			initialBalance: bankAccount.initialBalance,
			createdAt: bankAccount.createdAt,
		}
	}
}
