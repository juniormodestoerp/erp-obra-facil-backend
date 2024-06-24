import type { PaymentMethod as RawPaymentMethod } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { PaymentMethod } from '@modules/payment-methods/entities/payment-method'

export class PrismaPaymentMethodsMapper {
	static toPrisma(paymentMethod: PaymentMethod): RawPaymentMethod {
		return {
			id: paymentMethod.id,
			userId: paymentMethod.userId,
			name: paymentMethod.name,
			createdAt: paymentMethod.createdAt,
			updatedAt: paymentMethod.updatedAt,
			deletedAt: paymentMethod.deletedAt,
		}
	}

	static toDomain(raw: RawPaymentMethod): PaymentMethod {
		return PaymentMethod.create(
			{
				userId: raw.userId,
				name: raw.name,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				deletedAt: raw.deletedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
