import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'
import { PrismaSettingsRepository } from '@modules/settings/repositories/prisma/repositories/settings-respository'

import { SaveUserUseCase } from '@modules/users/use-cases/save-user-use-case'

import { Bcrypt } from '@shared/infra/providers/hash/bcrypt'

export function makeSaveUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const settingsRepository = new PrismaSettingsRepository()
  const hash = new Bcrypt()

  return new SaveUserUseCase(usersRepository, settingsRepository, hash)
}
