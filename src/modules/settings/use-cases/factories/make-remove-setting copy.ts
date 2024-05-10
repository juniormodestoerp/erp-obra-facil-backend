import { PrismaSettingsRepository } from '@modules/settings/repositories/prisma/repositories/settings-respository'

import { RemoveSettingUseCase } from '@modules/settings/use-cases/remove-setting-use-case'

export function makeShowSettingUseCase() {
  const settingsRepository = new PrismaSettingsRepository()

  return new RemoveSettingUseCase(settingsRepository)
}
