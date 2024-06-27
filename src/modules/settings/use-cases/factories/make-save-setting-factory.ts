import { PrismaSettingsRepository } from '@modules/settings/repositories/prisma/repositories/settings-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-repository'

import { SaveSettingUseCase } from '@modules/settings/use-cases/save-setting-use-case'

export function makeSaveSettingUseCase() {
	const settingsRepository = new PrismaSettingsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new SaveSettingUseCase(settingsRepository, usersRepository)
}
