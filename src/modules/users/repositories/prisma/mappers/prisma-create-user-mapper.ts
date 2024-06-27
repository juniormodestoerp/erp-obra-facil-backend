import type { User } from '@modules/users/entities/user'
import type { Setting } from '@modules/settings/entities/setting'

export class PrismaCreateUserMapper {
	static toPrisma(user: User) {
		return {
			id: user.id,
			addressId: user.addressId,
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
			profilePicture: user.profilePicture,
		}
	}
}

export class PrismaCreateUserSettingsMapper {
	static toPrisma(setting: Setting) {
		return {
			id: setting.id,
			userId: setting.userId,
			fieldName: setting.fieldName,
			isFieldEnable: setting.isFieldEnable,
			isFieldRequired: setting.isFieldRequired,
			title: setting.title,
			description: setting.description,
		}
	}
}
