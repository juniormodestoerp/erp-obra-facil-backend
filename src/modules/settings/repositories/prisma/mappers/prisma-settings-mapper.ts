import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Setting } from '@modules/settings/entities/setting'
import type {
	// User as RawUser,
	// Address as RawAddress,
	// File as RawFiles,
	Setting as RawSetting,
} from '@prisma/client'
// import { PrismaUserMapper } from '@modules/users/repositories/prisma/mappers/prisma-user-mapper'

export class PrismaSettingsMapper {
	static toPrisma(setting: Setting): RawSetting {
		return {
			id: setting.id,
			userId: setting.userId, // Suficiente para o prisma fazer a conexão com user
			fieldName: setting.fieldName,
			isFieldEnable: setting.isFieldEnable,
			isFieldRequired: setting.isFieldRequired,
			title: setting.title,
			description: setting.description,
			createdAt: setting.createdAt,
			updatedAt: setting.updatedAt,
			deletedAt: setting.deletedAt,
		}
	}

	// Adicionar USER ao toDomain
	static toDomain(
		raw: RawSetting,
		// & {
		//   user: RawUser & {
		//     address: RawAddress | null;
		//     files: RawFiles[];
		//     settings: RawSetting[];
		//   };
		// },
	): Setting {
		return Setting.create(
			{
				userId: raw.userId,
				fieldName: raw.fieldName,
				isFieldEnable: raw.isFieldEnable,
				isFieldRequired: raw.isFieldRequired,
				title: raw.title,
				description: raw.description,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				deletedAt: raw.deletedAt,
				user: null,
			},
			new UniqueEntityID(raw.id),
		)
	}
}
