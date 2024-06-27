import type { Method } from '@modules/methods/entities/method'

export class PaymentMethodsViewModel {
	static toHTTP(method: Method) {
		return {
			id: method.id,
			name: method.name,
			createdAt: method.createdAt,
		}
	}
}
