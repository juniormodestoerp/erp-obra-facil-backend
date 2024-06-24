import type { PrismaClient } from '@prisma/client'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { Transfer } from '@modules/transfers/entities/transfer'
import type { TransfersRepository } from '@modules/transfers/repositories/transfers-repository'
import { PrismaTransfersMapper } from '@modules/transfers/repositories/prisma/mappers/prisma-transfers-mapper'

import { prisma } from '@shared/infra/database/prisma'

export class PrismaTransfersRepository implements TransfersRepository {
	private repository: PrismaClient

	constructor() {
		this.repository = prisma
	}

	async findById(id: string): Promise<Transfer | null> {
		const transfer = await this.repository.transfer.findUnique({
			where: {
				id,
				deletedAt: null,
			},
		})

		if (!transfer) {
			return null
		}

		return PrismaTransfersMapper.toDomain(transfer)
	}

	async findByName(name: string): Promise<Transfer | null> {
		const transfer = await this.repository.transfer.findFirst({
			where: {
				name,
				deletedAt: null,
			},
		})

		if (!transfer) {
			return null
		}

		return PrismaTransfersMapper.toDomain(transfer)
	}

	async findMany(): Promise<Transfer[]> {
		const transfers = await this.repository.transfer.findMany({
			where: {
				deletedAt: null,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		})

		if (!transfers) {
			return []
		}

		return transfers.map((transfer) =>
			PrismaTransfersMapper.toDomain(transfer),
		)
	}

	async selectInput(): Promise<ISelectInputDTO[]> {
		const transfers = await this.repository.transfer.findMany({
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

		if (!transfers) {
			return []
		}

		return transfers.map((transfer) => {
			return {
				field: transfer.name,
				value: transfer.id,
			}
		})
	}

	async create(transfer: Transfer): Promise<void> {
		const prismaTransferData = PrismaTransfersMapper.toPrisma(transfer)

		await this.repository.transfer.create({
			data: prismaTransferData,
		})
	}

	async save(transfer: Transfer): Promise<void> {
		const prismaTransferData = PrismaTransfersMapper.toPrisma(transfer)

		await this.repository.transfer.update({
			where: {
				id: transfer.id,
				deletedAt: null,
			},
			data: prismaTransferData,
		})
	}

	async remove(id: string): Promise<void> {
		await this.repository.transfer.delete({
			where: {
				id,
				deletedAt: null,
			},
		})
	}
}
