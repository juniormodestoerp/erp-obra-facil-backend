import type { PrismaClient } from '@prisma/client'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { IFindAccountByNameDTO } from '@modules/accounts/dtos/find-account-by-name-dto'
import type { Account } from '@modules/accounts/entities/account'
import type { DomainAccountsRepository } from '@modules/accounts/repositories/domain-accounts-repository'
import { PrismaAccountsMapper } from '@modules/accounts/repositories/prisma/mappers/prisma-accounts-mapper'

import { prisma } from '@shared/infra/database/prisma'

export class PrismaDomainAccountsRepository
	implements DomainAccountsRepository
{
	private repository: PrismaClient

	constructor() {
		this.repository = prisma
	}

	async findById(id: string): Promise<Account | null> {
		const account = await this.repository.account.findUnique({
			where: {
				id,
				deletedAt: null,
			},
		})

		if (!account) {
			return null
		}

		return PrismaAccountsMapper.toDomain(account)
	}

	async findByName({
		userId,
		name,
	}: IFindAccountByNameDTO): Promise<Account | null> {
		const account = await this.repository.account.findFirst({
			where: {
				userId,
				name,
				deletedAt: null,
			},
		})

		if (!account) {
			return null
		}

		return PrismaAccountsMapper.toDomain(account)
	}

	async findBySubbankAccountName({
		userId,
		name,
	}: IFindAccountByNameDTO): Promise<Account | null> {
		const account = await this.repository.account.findFirst({
			where: {
				userId,
				name,
				deletedAt: null,
			},
		})

		if (!account) {
			return null
		}

		return PrismaAccountsMapper.toDomain(account)
	}

	async findMany(userId: string): Promise<Account[]> {
		const bankAccounts = await this.repository.account.findMany({
			where: {
				userId,
				deletedAt: null,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		})

		if (!bankAccounts) {
			return []
		}

		return bankAccounts.map((account) => PrismaAccountsMapper.toDomain(account))
	}

	async selectInput(): Promise<ISelectInputDTO[]> {
		const bankAccounts = await this.repository.account.findMany({
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

		if (!bankAccounts) {
			return []
		}

		return bankAccounts.map((account) => {
			return {
				field: account.name,
				value: account.id,
			}
		})
	}

	async create(account: Account): Promise<void> {
		const prismaAccountData = PrismaAccountsMapper.toPrisma(account)

		await this.repository.account.create({
			data: prismaAccountData,
		})
	}

	async save(account: Account): Promise<void> {
		const prismaAccountData = PrismaAccountsMapper.toPrisma(account)

		await this.repository.account.update({
			where: {
				id: account.id,
				deletedAt: null,
			},
			data: prismaAccountData,
		})
	}

	async remove(id: string): Promise<void> {
		await this.repository.account.delete({
			where: {
				id,
				deletedAt: null,
			},
		})
	}
}
