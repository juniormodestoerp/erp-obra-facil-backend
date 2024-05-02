import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { AuthenticateUseCase } from '@modules/users/use-cases/authenticate'

import { Bcrypt } from '@shared/infra/providers/hash/bcrypt'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const hash = new Bcrypt()

  return new AuthenticateUseCase(usersRepository, hash)
}
