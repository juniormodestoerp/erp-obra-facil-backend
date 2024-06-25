import type { Transfer } from '@modules/transfers/entities/transfer'

export class TransfersViewModel {
	static toHTTP(transfer: Transfer) {
		return {
			id: transfer.id,
			name: transfer.name,
			createdAt: transfer.createdAt,
		}
	}
}
