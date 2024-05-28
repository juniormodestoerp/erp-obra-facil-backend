import { PrismaSettingsRepository } from '@modules/settings/repositories/prisma/repositories/settings-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { FetchSettingsUseCase } from '@modules/settings/use-cases/fetch-settings-use-case'

export function makeFetchSettingsUseCase() {
	const settingsRepository = new PrismaSettingsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchSettingsUseCase(settingsRepository, usersRepository)
}
