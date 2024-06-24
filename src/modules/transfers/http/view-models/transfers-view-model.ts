import type { Transfer } from '@modules/transfers/entities/transfer'

export class TransfersViewModel {
	static toHTTP(transfer: Transfer) {
		return {
			id: transfer.id,
			userId: transfer.userId,
			transferName: transfer.name,
			currency: transfer.currency,
			logo: transfer.logo,
			initialBalance: transfer.initialBalance,
			createdAt: transfer.createdAt,
		}
	}
}
