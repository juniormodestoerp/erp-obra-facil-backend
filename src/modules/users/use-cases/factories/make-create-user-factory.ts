import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { CreateUserUseCase } from '@modules/users/use-cases/create-user-use-case'

import { Bcrypt } from '@shared/infra/providers/hash/bcrypt'

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const hash = new Bcrypt()

  return new CreateUserUseCase(usersRepository, hash)
}
