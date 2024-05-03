import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { AuthenticateUserUseCase } from '@modules/users/use-cases/authenticate-user-use-case'

import { Bcrypt } from '@shared/infra/providers/hash/bcrypt'

export function makeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const hash = new Bcrypt()

  return new AuthenticateUserUseCase(usersRepository, hash)
}
