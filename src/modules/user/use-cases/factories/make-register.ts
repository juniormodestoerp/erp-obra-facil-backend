import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-respository'

import { RegisterUseCase } from '@modules/user/use-cases/register'

import { Bcrypt } from '@shared/infra/providers/hash/bcrypt'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUserRepository()
  const hash = new Bcrypt()

  return new RegisterUseCase(usersRepository, hash)
}
