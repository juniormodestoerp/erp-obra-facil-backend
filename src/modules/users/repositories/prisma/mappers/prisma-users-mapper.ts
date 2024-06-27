import type {
	Account as RawAccount,
	Address as RawAddress,
	Category as RawCategory,
	Center as RawCenter,
	File as RawFiles,
	Method as RawMethod,
	Setting as RawSetting,
	Tag as RawTag,
	Transaction as RawTransaction,
	User as RawUser,
	UserToken as RawUserToken,
} from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { PrismaAccountsMapper } from '@modules/accounts/repositories/prisma/mappers/prisma-accounts-mapper'
import { PrismaAddressesMapper } from '@modules/addresses/repositories/prisma/mappers/prisma-addresses-mapper'
import { PrismaCategoriesMapper } from '@modules/categories/repositories/prisma/mappers/prisma-categories-mapper'
import { PrismaCentersMapper } from '@modules/centers/repositories/prisma/mappers/prisma-centers-mapper'
import { PrismaMethodsMapper } from '@modules/methods/repositories/prisma/mappers/prisma-methods-mapper'
import { PrismaSettingsMapper } from '@modules/settings/repositories/prisma/mappers/prisma-settings-mapper'
import { PrismaTagsMapper } from '@modules/tags/repositories/prisma/mappers/prisma-tags-mapper'
import { PrismaTransactionsMapper } from '@modules/transactions/repositories/prisma/mappers/prisma-transactions-mapper'
import { User, type UserRole } from '@modules/users/entities/user'
import { PrismaUserFilesMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-files-mapper'
import { PrismaUserTokenMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-tokens-mapper'

export class PrismaUsersMapper {
	static toPrisma(user: User) {
		return {
			id: user.id,
			addressId: user.address ? user.addressId : null,
			name: user.name,
			document: user.document,
			email: user.email,
			phone: user.phone,
			birthDate: user.birthDate,
			password: user.password,
			role: user.role,
			status: user.status,
			balance: user.balance,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			deletedAt: user.deletedAt,
			fileId: user.files.length > 0 ? user.files[0].id.toString() : null,
			profilePicture: user.profilePicture,
			address: {
				connect: user.address,
			},
			files: {
				connect: user.files.map((file) => ({
					id: file.id,
				})),
			},
			settings: {
				connect: user.settings.map((setting) => ({
					id: setting.id,
				})),
			},
			tags: {
				connect: user.tags.map((tag) => ({
					id: tag.id,
				})),
			},
			centers: {
				connect: user.centers.map((center) => ({
					id: center.id,
				})),
			},
			methods: {
				connect: user.methods.map((method) => ({
					id: method.id,
				})),
			},
			accounts: {
				connect: user.accounts.map((account) => ({
					id: account.id,
				})),
			},
			categories: {
				connect: user.categories.map((category) => ({
					id: category.id,
				})),
			},
			userTokens: {
				connect: user.userTokens.map((userToken) => ({
					id: userToken.id,
				})),
			},
			transactions: {
				connect: user.transactions.map((transaction) => ({
					id: transaction.id,
				})),
			},
		}
	}

	static toDomain(
		raw: RawUser & {
			address?: RawAddress | null
			files?: RawFiles[]
			settings?: RawSetting[]
			tags?: RawTag[]
			centers?: RawCenter[]
			methods?: RawMethod[]
			accounts?: RawAccount[]
			categories?: RawCategory[]
			userTokens?: RawUserToken[]
			transactions?: RawTransaction[]
		},
	): User {
		const address = raw.address
			? PrismaAddressesMapper.toDomain(raw.address)
			: null

		const files = raw.files
			? raw.files.map((file) => PrismaUserFilesMapper.toDomain(file))
			: []

		const settings = raw.settings
			? raw.settings.map((setting) => PrismaSettingsMapper.toDomain(setting))
			: []

		const tags = raw.tags
			? raw.tags.map((tag) => PrismaTagsMapper.toDomain(tag))
			: []

		const centers = raw.centers
			? raw.centers.map((center) => PrismaCentersMapper.toDomain(center))
			: []

		const methods = raw.methods
			? raw.methods.map((method) => PrismaMethodsMapper.toDomain(method))
			: []

		const accounts = raw.accounts
			? raw.accounts.map((account) => PrismaAccountsMapper.toDomain(account))
			: []

		const categories = raw.categories
			? raw.categories.map((category) =>
					PrismaCategoriesMapper.toDomain(category),
				)
			: []

		const userTokens = raw.userTokens
			? raw.userTokens.map((token) => PrismaUserTokenMapper.toDomain(token))
			: []

		const transactions = raw.transactions
			? raw.transactions.map((transaction: RawTransaction) => {
					return PrismaTransactionsMapper.toDomain(transaction)
				})
			: []

		return User.create(
			{
				addressId: raw.addressId,
				name: raw.name,
				document: raw.document,
				email: raw.email,
				phone: raw.phone,
				birthDate: raw.birthDate,
				password: raw.password,
				balance: raw.balance,
				profilePicture: raw.profilePicture,
				role: raw.role as UserRole,
				status: raw.status,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				deletedAt: raw.deletedAt,
				address,
				files,
				settings,
				tags,
				centers,
				methods,
				accounts,
				categories,
				userTokens,
				transactions,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
