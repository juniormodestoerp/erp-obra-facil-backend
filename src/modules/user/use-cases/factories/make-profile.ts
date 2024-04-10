import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-respository'

import { ProfileUseCase } from '@modules/user/use-cases/profile'

export function makeProfileUseCase() {
  const usersRepository = new PrismaUserRepository()

  return new ProfileUseCase(usersRepository)
}
