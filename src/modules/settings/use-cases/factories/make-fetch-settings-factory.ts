import { PrismaSettingsRepository } from '@modules/settings/repositories/prisma/repositories/settings-repository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-repository'

import { FetchSettingsUseCase } from '@modules/settings/use-cases/fetch-settings-use-case'

export function makeFetchSettingsUseCase() {
	const settingsRepository = new PrismaSettingsRepository()
	const usersRepository = new PrismaUsersRepository()

	return new FetchSettingsUseCase(settingsRepository, usersRepository)
}
