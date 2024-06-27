import type { PrismaClient } from '@prisma/client'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { IFindBankAccountByNameDTO } from '@modules/accounts/dtos/find-bank-account-by-name-dto'
import type { Account } from '@modules/accounts/entities/account'
import type { BankAccountsRepository } from '@modules/accounts/repositories/bank-accounts-repository'
import { PrismaAccountsMapper } from '@modules/accounts/repositories/prisma/mappers/prisma-bank-accounts-mapper'

import { prisma } from '@shared/infra/database/prisma'

export class PrismaBankAccountsRepository implements BankAccountsRepository {
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
	}: IFindBankAccountByNameDTO): Promise<Account | null> {
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
	}: IFindBankAccountByNameDTO): Promise<Account | null> {
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
		const prismaBankAccountData = PrismaAccountsMapper.toPrisma(account)

		await this.repository.account.create({
			data: prismaBankAccountData,
		})
	}

	async save(account: Account): Promise<void> {
		const prismaBankAccountData = PrismaAccountsMapper.toPrisma(account)

		await this.repository.account.update({
			where: {
				id: account.id,
				deletedAt: null,
			},
			data: prismaBankAccountData,
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
