import type { Account } from '@modules/accounts/entities/account'

export class BankAccountsViewModel {
	static toHTTP(account: Account) {
		return {
			id: account.id,
			accountType: account.accountType,
			name: account.name,
			currency: account.currency,
			logo: account.logo,
			limit: account.limit,
			limitType: account.limitType,
			dueDateDay: account.dueDateDay,
			dueDateFirstInvoice: account.dueDateFirstInvoice,
			closingDateInvoice: account.closingDateInvoice,
			balanceFirstInvoice: account.balanceFirstInvoice,
			isFirstInvoice: account.isFirstInvoice,
			isCreditCard: account.isCreditCard,
			initialBalance: account.initialBalance,
			createdAt: account.createdAt?.toISOString(),
		}
	}
}
