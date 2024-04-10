import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-respository'
import { PrismaUserTokensRepository } from '@modules/user/repositories/prisma/repositories/user-tokens-respository'

import { ResetForgotPasswordUseCase } from '@modules/user/use-cases/reset-forgot-password'

import { Bcrypt } from '@shared/infra/providers/hash/bcrypt'

export function makeResetForgotPasswordUseCase() {
  const usersRepository = new PrismaUserRepository()
  const usersTokenRepository = new PrismaUserTokensRepository()
  const hash = new Bcrypt()

  return new ResetForgotPasswordUseCase(
    usersRepository,
    usersTokenRepository,
    hash,
  )
}
