import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-respository'
import { PrismaUserTokensRepository } from '@modules/user/repositories/prisma/repositories/user-tokens-respository'

import { ForgotPasswordUseCase } from '@modules/user/use-cases/forgot-password'

import { Bcrypt } from '@shared/infra/providers/hash/bcrypt'

export function makeForgotPasswordUseCase() {
  const usersRepository = new PrismaUserRepository()
  const usersTokenRepository = new PrismaUserTokensRepository()
  const hash = new Bcrypt()

  return new ForgotPasswordUseCase(usersRepository, usersTokenRepository, hash)
}
