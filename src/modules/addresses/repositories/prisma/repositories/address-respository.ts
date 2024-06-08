import type { PrismaClient, Address as PrismaAddress } from '@prisma/client'

import type { IFindAddressByIdDTO } from '@modules/addresses/dtos/find-address-by-id-dto'
import type { IFindMainAddressDTO } from '@modules/addresses/dtos/find-main-address-dto'
import type { Address } from '@modules/addresses/entities/address'
import type { AddressesRepository } from '@modules/addresses/repositories/address-repository'
import { PrismaAddressesMapper } from '@modules/addresses/repositories/prisma/mappers/prisma-address-mapper'

import { prisma } from '@shared/infra/database/prisma'
import { RedisCache } from '@shared/infra/providers/cache/redis'

export class PrismaAddressesRepository implements AddressesRepository {
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

	async findMainAddress({
		userId,
	}: IFindMainAddressDTO): Promise<Address | null> {
		const cacheKey = `address:${userId}`

		const cachedMainAddress = await this.cache.get<PrismaAddress>(cacheKey)

		if (cachedMainAddress) {
			return PrismaAddressesMapper.toDomain(cachedMainAddress)
		}

		const address = await this.repository.address.findFirst({
			where: {
				userId,
				isMain: true,
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
