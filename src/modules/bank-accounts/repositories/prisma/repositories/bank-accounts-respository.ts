import type { PrismaClient } from '@prisma/client'

import type { ISelectInputDTO } from '@core/domain/dtos/select-input-dto'

import type { IFindBankAccountByNameDTO } from '@modules/bank-accounts/dtos/find-bank-account-by-name-dto'
import type { BankAccount } from '@modules/bank-accounts/entities/bank-account'
import type { BankAccountsRepository } from '@modules/bank-accounts/repositories/bank-accounts-repository'
import { PrismaBankAccountsMapper } from '@modules/bank-accounts/repositories/prisma/mappers/prisma-bank-accounts-mapper'

import { prisma } from '@shared/infra/database/prisma'

export class PrismaBankAccountsRepository implements BankAccountsRepository {
	private repository: PrismaClient

	constructor() {
		this.repository = prisma
	}

	async findById(id: string): Promise<BankAccount | null> {
		const bankAccount = await this.repository.bankAccount.findUnique({
			where: {
				id,
				deletedAt: null,
			},
		})

		if (!bankAccount) {
			return null
		}

		return PrismaBankAccountsMapper.toDomain(bankAccount)
	}

	async findByName({
		userId,
		name,
	}: IFindBankAccountByNameDTO): Promise<BankAccount | null> {
		const bankAccount = await this.repository.bankAccount.findFirst({
			where: {
				userId,
				name,
				deletedAt: null,
			},
		})

		if (!bankAccount) {
			return null
		}

		return PrismaBankAccountsMapper.toDomain(bankAccount)
	}

	async findBySubbankAccountName({
		userId,
		name,
	}: IFindBankAccountByNameDTO): Promise<BankAccount | null> {
		const bankAccount = await this.repository.bankAccount.findFirst({
			where: {
				userId,
				name,
				deletedAt: null,
			},
		})

		if (!bankAccount) {
			return null
		}

		return PrismaBankAccountsMapper.toDomain(bankAccount)
	}

	async findMany(userId: string): Promise<BankAccount[]> {
		const bankAccounts = await this.repository.bankAccount.findMany({
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

		return bankAccounts.map((bankAccount) =>
			PrismaBankAccountsMapper.toDomain(bankAccount),
		)
	}

	async selectInput(): Promise<ISelectInputDTO[]> {
		const bankAccounts = await this.repository.bankAccount.findMany({
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

		return bankAccounts.map((bankAccount) => {
			return {
				field: bankAccount.name,
				value: bankAccount.id,
			}
		})
	}

	async create(bankAccount: BankAccount): Promise<void> {
		const prismaBankAccountData = PrismaBankAccountsMapper.toPrisma(bankAccount)

		await this.repository.bankAccount.create({
			data: prismaBankAccountData,
		})
	}

	async save(bankAccount: BankAccount): Promise<void> {
		const prismaBankAccountData = PrismaBankAccountsMapper.toPrisma(bankAccount)

		await this.repository.bankAccount.update({
			where: {
				id: bankAccount.id,
				deletedAt: null,
			},
			data: prismaBankAccountData,
		})
	}

	async remove(id: string): Promise<void> {
		await this.repository.bankAccount.delete({
			where: {
				id,
				deletedAt: null,
			},
		})
	}
}
