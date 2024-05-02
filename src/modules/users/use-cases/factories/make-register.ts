import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { RegisterUseCase } from '@modules/users/use-cases/register'

import { Bcrypt } from '@shared/infra/providers/hash/bcrypt'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const hash = new Bcrypt()

  return new RegisterUseCase(usersRepository, hash)
}
