import { PrismaSettingsRepository } from '@modules/settings/repositories/prisma/repositories/settings-respository'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { SaveSettingUseCase } from '@modules/settings/use-cases/save-setting-use-case'

export function makeSaveSettingUseCase() {
  const settingsRepository = new PrismaSettingsRepository()
  const usersRepository = new PrismaUsersRepository()

  return new SaveSettingUseCase(settingsRepository, usersRepository)
}
