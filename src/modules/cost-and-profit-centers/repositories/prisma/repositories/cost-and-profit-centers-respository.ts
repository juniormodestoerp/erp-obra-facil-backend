import type { PrismaClient } from '@prisma/client'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { Center } from '@modules/cost-and-profit-centers/entities/cost-and-profit-center'
import type { CostAndProfitCentersRepository } from '@modules/cost-and-profit-centers/repositories/cost-and-profit-centers-repository'
import { PrismaCentersMapper } from '@modules/cost-and-profit-centers/repositories/prisma/mappers/prisma-cost-and-profit-centers-mapper'

import { prisma } from '@shared/infra/database/prisma'

export class PrismaCostAndProfitCentersRepository
	implements CostAndProfitCentersRepository
{
	private repository: PrismaClient

	constructor() {
		this.repository = prisma
	}

	async findById(id: string): Promise<Center | null> {
		const center = await this.repository.center.findUnique({
			where: {
				id,
				deletedAt: null,
			},
		})

		if (!center) {
			return null
		}

		return PrismaCentersMapper.toDomain(center)
	}

	async findByName(name: string): Promise<Center | null> {
		const center = await this.repository.center.findFirst({
			where: {
				name,
				deletedAt: null,
			},
		})

		if (!center) {
			return null
		}

		return PrismaCentersMapper.toDomain(center)
	}

	async findMany(userId: string): Promise<Center[]> {
		const costAndProfitCenters = await this.repository.center.findMany({
			where: {
				userId,
				deletedAt: null,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		})

		if (!costAndProfitCenters) {
			return []
		}

		return costAndProfitCenters.map((center) =>
			PrismaCentersMapper.toDomain(center),
		)
	}

	async selectInput(): Promise<ISelectInputDTO[]> {
		const costAndProfitCenters = await this.repository.center.findMany({
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

		if (!costAndProfitCenters) {
			return []
		}

		return costAndProfitCenters.map((center) => {
			return {
				field: center.name,
				value: center.id,
			}
		})
	}

	async create(center: Center): Promise<void> {
		const prismaCostAndProfitCenterData = PrismaCentersMapper.toPrisma(center)

		await this.repository.center.create({
			data: prismaCostAndProfitCenterData,
		})
	}

	async save(center: Center): Promise<void> {
		const prismaCostAndProfitCenterData = PrismaCentersMapper.toPrisma(center)

		await this.repository.center.update({
			where: {
				id: center.id,
				deletedAt: null,
			},
			data: prismaCostAndProfitCenterData,
		})
	}

	async remove(id: string): Promise<void> {
		await this.repository.center.delete({
			where: {
				id,
				deletedAt: null,
			},
		})
	}
}
