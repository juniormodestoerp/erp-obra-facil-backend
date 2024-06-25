import type { BankAccount } from '@modules/bank-accounts/entities/bank-account'

export class BankAccountsViewModel {
	static toHTTP(bankAccount: BankAccount) {
		return {
			id: bankAccount.id,
			name: bankAccount.name,
			currency: bankAccount.currency,
			logo: bankAccount.logo,
			limit: bankAccount.limit,
			limitType: bankAccount.limitType,
			dueDateDay: bankAccount.dueDateDay,
			dueDateFirstInvoice: bankAccount.dueDateFirstInvoice,
			closingDateInvoice: bankAccount.closingDateInvoice,
			balanceFirstInvoice: bankAccount.balanceFirstInvoice,
			isFirstInvoice: bankAccount.isFirstInvoice,
			isCreditCard: bankAccount.isCreditCard,
			initialBalance: bankAccount.initialBalance,
			createdAt: bankAccount.createdAt.toISOString(),
		}
	}
}
