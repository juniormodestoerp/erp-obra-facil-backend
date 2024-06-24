import type { PrismaClient } from '@prisma/client'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { PaymentMethod } from '@modules/payment-methods/entities/payment-method'
import type { PaymentMethodsRepository } from '@modules/payment-methods/repositories/payment-methods-repository'
import { PrismaPaymentMethodsMapper } from '@modules/payment-methods/repositories/prisma/mappers/prisma-payment-methods-mapper'

import { prisma } from '@shared/infra/database/prisma'

export class PrismaPaymentMethodsRepository implements PaymentMethodsRepository {
	private repository: PrismaClient

	constructor() {
		this.repository = prisma
	}

	async findById(id: string): Promise<PaymentMethod | null> {
		const paymentMethod = await this.repository.paymentMethod.findUnique({
			where: {
				id,
				deletedAt: null,
			},
		})

		if (!paymentMethod) {
			return null
		}

		return PrismaPaymentMethodsMapper.toDomain(paymentMethod)
	}

	async findByName(name: string): Promise<PaymentMethod | null> {
		const paymentMethod = await this.repository.paymentMethod.findFirst({
			where: {
				name,
				deletedAt: null,
			},
		})

		if (!paymentMethod) {
			return null
		}

		return PrismaPaymentMethodsMapper.toDomain(paymentMethod)
	}

	async findMany(userId: string): Promise<PaymentMethod[]> {
		const paymentMethods = await this.repository.paymentMethod.findMany({
			where: {
				userId,
				deletedAt: null,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		})

		if (!paymentMethods) {
			return []
		}

		return paymentMethods.map((paymentMethod) =>
			PrismaPaymentMethodsMapper.toDomain(paymentMethod),
		)
	}

	async selectInput(): Promise<ISelectInputDTO[]> {
		const paymentMethods = await this.repository.paymentMethod.findMany({
			where: {
				deletedAt: null,
			},
			orderBy: {
				updatedAt: 'desc',
			},
			select: {
				id: true,
				name: true,
			},
		})

		if (!paymentMethods) {
			return []
		}

		return paymentMethods.map((paymentMethod) => {
			return {
				field: paymentMethod.name,
				value: paymentMethod.id,
			}
		})
	}

	async create(paymentMethod: PaymentMethod): Promise<void> {
		const prismaPaymentMethodData = PrismaPaymentMethodsMapper.toPrisma(paymentMethod)

		await this.repository.paymentMethod.create({
			data: prismaPaymentMethodData,
		})
	}

	async save(paymentMethod: PaymentMethod): Promise<void> {
		const prismaPaymentMethodData = PrismaPaymentMethodsMapper.toPrisma(paymentMethod)

		await this.repository.paymentMethod.update({
			where: {
				id: paymentMethod.id,
				deletedAt: null,
			},
			data: prismaPaymentMethodData,
		})
	}

	async remove(id: string): Promise<void> {
		await this.repository.paymentMethod.delete({
			where: {
				id,
				deletedAt: null,
			},
		})
	}
}
