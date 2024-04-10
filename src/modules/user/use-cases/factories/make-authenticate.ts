import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-respository'

import { AuthenticateUseCase } from '@modules/user/use-cases/authenticate'

import { Bcrypt } from '@shared/infra/providers/hash/bcrypt'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUserRepository()
  const hash = new Bcrypt()

  return new AuthenticateUseCase(usersRepository, hash)
}
