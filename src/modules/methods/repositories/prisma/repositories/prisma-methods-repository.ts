import type { PrismaClient } from '@prisma/client'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { Method } from '@modules/methods/entities/method'
import type { DomainMethodsRepository } from '@modules/methods/repositories/domain-methods-repository'
import { PrismaMethodsMapper } from '@modules/methods/repositories/prisma/mappers/prisma-methods-mapper'

import { prisma } from '@shared/infra/database/prisma'

export class PrismaMethodsRepository implements DomainMethodsRepository {
	private repository: PrismaClient

	constructor() {
		this.repository = prisma
	}

	async findById(id: string): Promise<Method | null> {
		const method = await this.repository.method.findUnique({
			where: {
				id,
				deletedAt: null,
			},
		})

		if (!method) {
			return null
		}

		return PrismaMethodsMapper.toDomain(method)
	}

	async findByName(name: string): Promise<Method | null> {
		const method = await this.repository.method.findFirst({
			where: {
				name,
				deletedAt: null,
			},
		})

		if (!method) {
			return null
		}

		return PrismaMethodsMapper.toDomain(method)
	}

	async findMany(userId: string): Promise<Method[]> {
		const paymentMethods = await this.repository.method.findMany({
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

		return paymentMethods.map((method) => PrismaMethodsMapper.toDomain(method))
	}

	async selectInput(): Promise<ISelectInputDTO[]> {
		const paymentMethods = await this.repository.method.findMany({
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

		return paymentMethods.map((method) => {
			return {
				field: method.name,
				value: method.id,
			}
		})
	}

	async create(method: Method): Promise<void> {
		const prismaMethodData = PrismaMethodsMapper.toPrisma(method)

		await this.repository.method.create({
			data: prismaMethodData,
		})
	}

	async save(method: Method): Promise<void> {
		const prismaMethodData = PrismaMethodsMapper.toPrisma(method)

		await this.repository.method.update({
			where: {
				id: method.id,
				deletedAt: null,
			},
			data: prismaMethodData,
		})
	}

	async remove(id: string): Promise<void> {
		await this.repository.method.delete({
			where: {
				id,
				deletedAt: null,
			},
		})
	}
}
