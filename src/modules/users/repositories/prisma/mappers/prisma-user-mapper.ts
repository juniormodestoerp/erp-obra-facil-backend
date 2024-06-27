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

import { PrismaAddressesMapper } from '@modules/addresses/repositories/prisma/mappers/prisma-address-mapper'
import { PrismaAccountMapper } from '@modules/accounts/repositories/prisma/mappers/prisma-account-mapper'
import { PrismaCategoryMapper } from '@modules/categories/repositories/prisma/mappers/prisma-category-mapper'
import { PrismaCenterMapper } from '@modules/cost-and-profit-centers/repositories/prisma/mappers/prisma-center-mapper'
import { PrismaMethodMapper } from '@modules/methods/repositories/prisma/mappers/prisma-method-mapper'
import { PrismaSettingsMapper } from '@modules/settings/repositories/prisma/mappers/prisma-settings-mapper'
import { PrismaTagMapper } from '@modules/tags/repositories/prisma/mappers/prisma-tag-mapper'
import { PrismaTransactionMapper } from '@modules/transactions/repositories/prisma/mappers/prisma-transaction-mapper'
import { User, type UserRole } from '@modules/users/entities/user'
import { PrismaUserFilesMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-files-mapper'
import { PrismaUserTokenMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-token-mapper'

export class PrismaUsersMapper {
	static toPrisma(user: User) {
		return {
			id: user.id.toString(),
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
			addressId: user.address ? user.address.id.toString() : null,
			fileId: user.files.length > 0 ? user.files[0].id.toString() : null,
			profilePicture: user.profilePicture,
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
			? raw.tags.map((tag) => PrismaTagMapper.toDomain(tag))
			: []

		const centers = raw.centers
			? raw.centers.map((center) => PrismaCenterMapper.toDomain(center))
			: []

		const methods = raw.methods
			? raw.methods.map((method) => PrismaMethodMapper.toDomain(method))
			: []

		const accounts = raw.accounts
			? raw.accounts.map((account) => PrismaAccountMapper.toDomain(account))
			: []

		const categories = raw.categories
			? raw.categories.map((category) =>
					PrismaCategoryMapper.toDomain(category),
				)
			: []

		const userTokens = raw.userTokens
			? raw.userTokens.map((token) => PrismaUserTokenMapper.toDomain(token))
			: []

		const transactions = raw.transactions
			? raw.transactions.map((transaction) =>
					PrismaTransactionMapper.toDomain(transaction),
				)
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
