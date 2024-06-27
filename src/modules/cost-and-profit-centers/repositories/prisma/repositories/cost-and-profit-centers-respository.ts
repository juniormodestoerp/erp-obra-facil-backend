import type { PrismaClient } from '@prisma/client'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { CostAndProfitCenter } from '@modules/cost-and-profit-centers/entities/cost-and-profit-center'
import type { CostAndProfitCentersRepository } from '@modules/cost-and-profit-centers/repositories/cost-and-profit-centers-repository'
import { PrismaCostAndProfitCentersMapper } from '@modules/cost-and-profit-centers/repositories/prisma/mappers/prisma-cost-and-profit-centers-mapper'

import { prisma } from '@shared/infra/database/prisma'

export class PrismaCostAndProfitCentersRepository
	implements CostAndProfitCentersRepository
{
	private repository: PrismaClient

	constructor() {
		this.repository = prisma
	}

	async findById(id: string): Promise<CostAndProfitCenter | null> {
		const costAndProfitCenter =
			await this.repository.costAndProfitCenter.findUnique({
				where: {
					id,
					deletedAt: null,
				},
			})

		if (!costAndProfitCenter) {
			return null
		}

		return PrismaCostAndProfitCentersMapper.toDomain(costAndProfitCenter)
	}

	async findByName(name: string): Promise<CostAndProfitCenter | null> {
		const costAndProfitCenter =
			await this.repository.costAndProfitCenter.findFirst({
				where: {
					name,
					deletedAt: null,
				},
			})

		if (!costAndProfitCenter) {
			return null
		}

		return PrismaCostAndProfitCentersMapper.toDomain(costAndProfitCenter)
	}

	async findMany(userId: string): Promise<CostAndProfitCenter[]> {
		const costAndProfitCenters =
			await this.repository.costAndProfitCenter.findMany({
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

		return costAndProfitCenters.map((costAndProfitCenter) =>
			PrismaCostAndProfitCentersMapper.toDomain(costAndProfitCenter),
		)
	}

	async selectInput(): Promise<ISelectInputDTO[]> {
		const costAndProfitCenters =
			await this.repository.costAndProfitCenter.findMany({
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

		return costAndProfitCenters.map((costAndProfitCenter) => {
			return {
				field: costAndProfitCenter.name,
				value: costAndProfitCenter.id,
			}
		})
	}

	async create(costAndProfitCenter: CostAndProfitCenter): Promise<void> {
		const prismaCostAndProfitCenterData =
			PrismaCostAndProfitCentersMapper.toPrisma(costAndProfitCenter)

		await this.repository.costAndProfitCenter.create({
			data: prismaCostAndProfitCenterData,
		})
	}

	async save(costAndProfitCenter: CostAndProfitCenter): Promise<void> {
		const prismaCostAndProfitCenterData =
			PrismaCostAndProfitCentersMapper.toPrisma(costAndProfitCenter)

		await this.repository.costAndProfitCenter.update({
			where: {
				id: costAndProfitCenter.id,
				deletedAt: null,
			},
			data: prismaCostAndProfitCenterData,
		})
	}

	async remove(id: string): Promise<void> {
		await this.repository.costAndProfitCenter.delete({
			where: {
				id,
				deletedAt: null,
			},
		})
	}
}
