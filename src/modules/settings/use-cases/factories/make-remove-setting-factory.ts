import { PrismaSettingsRepository } from '@modules/settings/repositories/prisma/repositories/settings-repository'

import { RemoveSettingUseCase } from '@modules/settings/use-cases/remove-setting-use-case'

export function makeRemoveSettingUseCase() {
	const settingsRepository = new PrismaSettingsRepository()

	return new RemoveSettingUseCase(settingsRepository)
}
