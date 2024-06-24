import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { PaymentMethod } from '@modules/payment-methods/entities/payment-method'

export interface PaymentMethodsRepository {
	findById(id: string): Promise<PaymentMethod | null>
	findByName(name: string): Promise<PaymentMethod | null>
	findMany(userId: string): Promise<PaymentMethod[]>
	selectInput(): Promise<ISelectInputDTO[]>
	create(paymentMethod: PaymentMethod): Promise<void>
	save(paymentMethod: PaymentMethod): Promise<void>
	remove(id: string): Promise<void>
}
