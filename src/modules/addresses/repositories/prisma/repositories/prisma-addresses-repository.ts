import type { Address as PrismaAddress, PrismaClient } from '@prisma/client'

import type { IFindAddressByIdDTO } from '@modules/addresses/dtos/find-address-by-id-dto'
import type { IFindAddressByUserIdDTO } from '@modules/addresses/dtos/find-address-by-user-id-dto'
import type { Address } from '@modules/addresses/entities/address'
import type { DomainAddressesRepository } from '@modules/addresses/repositories/domain-addresses-repository'
import { PrismaAddressesMapper } from '@modules/addresses/repositories/prisma/mappers/prisma-addresses-mapper'

import { prisma } from '@shared/infra/database/prisma'
import { RedisCache } from '@shared/infra/providers/cache/redis'

export class PrismaAddressesRepository implements DomainAddressesRepository {
	private repository: PrismaClient
	private cache: RedisCache

	constructor() {
		this.repository = prisma
		this.cache = RedisCache.getInstance()
	}

	async findById({ id }: IFindAddressByIdDTO): Promise<Address | null> {
		const cacheKey = `address:${id}`

		const cachedAddress = await this.cache.get<PrismaAddress>(cacheKey)

		if (cachedAddress) {
			return PrismaAddressesMapper.toDomain(cachedAddress)
		}

		const address = await this.repository.address.findUnique({
			where: {
				id,
				deletedAt: null,
			},
		})

		if (!address) {
			return null
		}

		await this.cache.set(cacheKey, JSON.stringify(address), 60 * 10) // 10 minutes

		return PrismaAddressesMapper.toDomain(address)
	}

	async findByUserId({
		userId,
	}: IFindAddressByUserIdDTO): Promise<Address | null> {
		const cacheKey = `address:${userId}`

		const cachedAddress = await this.cache.get<PrismaAddress>(cacheKey)

		if (cachedAddress) {
			return PrismaAddressesMapper.toDomain(cachedAddress)
		}

		const address = await this.repository.address.findUnique({
			where: {
				userId,
				deletedAt: null,
			},
		})

		if (!address) {
			return null
		}

		await this.cache.set(cacheKey, JSON.stringify(address), 60 * 10) // 10 minutes

		return PrismaAddressesMapper.toDomain(address)
	}

	async count(): Promise<number> {
		return await this.repository.address.count()
	}

	async save(address: Address): Promise<void> {
		const prismaAddressData = PrismaAddressesMapper.toPrisma(address)

		await this.invalidateCache(prismaAddressData)

		const updatedAddress = await this.repository.address.upsert({
			where: {
				id: address.id,
			},
			include: {
				user: true,
			},
			create: prismaAddressData,
			update: prismaAddressData,
		})

		const cacheKeys = [`address:${address.id}`, `address:${address.userId}`]

		await Promise.all(
			cacheKeys.map(
				(key) => this.cache.set(key, JSON.stringify(updatedAddress), 60 * 10), // 10 minutes
			),
		)
	}

	async remove({ id }: IFindAddressByIdDTO): Promise<void> {
		const address = await this.repository.address.update({
			where: {
				id,
			},
			data: {
				deletedAt: new Date(),
			},
		})

		await this.invalidateCache(address)
	}

	private async invalidateCache(address: PrismaAddress): Promise<void> {
		const cacheKeys = [`address:${address.id}`, `address:${address.userId}`]

		await Promise.all(cacheKeys.map((key) => this.cache.delete(key)))
	}
}
