import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { ProfileUseCase } from '@modules/users/use-cases/profile'

export function makeProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()

  return new ProfileUseCase(usersRepository)
}
