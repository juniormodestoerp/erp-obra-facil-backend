import { PrismaSettingsRepository } from '@modules/settings/repositories/prisma/repositories/settings-respository'

import { ShowSettingUseCase } from '@modules/settings/use-cases/show-setting-use-case'

export function makeShowSettingUseCase() {
	const settingsRepository = new PrismaSettingsRepository()

	return new ShowSettingUseCase(settingsRepository)
}
