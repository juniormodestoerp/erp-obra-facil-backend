import type { PaymentMethod } from '@modules/payment-methods/entities/payment-method'

export class PaymentMethodsViewModel {
	static toHTTP(paymentMethod: PaymentMethod) {
		return {
			id: paymentMethod.id,
			name: paymentMethod.name,
			createdAt: paymentMethod.createdAt,
		}
	}
}
