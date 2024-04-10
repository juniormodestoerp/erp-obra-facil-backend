import { PrismaUserRepository } from '@modules/user/repositories/prisma/repositories/user-respository'
import { PrismaUserTokensRepository } from '@modules/user/repositories/prisma/repositories/user-tokens-respository'

import { SendForgotPasswordCodeUseCase } from '@modules/user/use-cases/send-forgot-password-code'

import { BullProvider } from '@shared/infra/providers/queue/bull'

export function makeSendForgotPasswordCode() {
  const usersRepository = new PrismaUserRepository()
  const userTokenRepository = new PrismaUserTokensRepository()
  const queue = new BullProvider()

  return new SendForgotPasswordCodeUseCase(
    usersRepository,
    userTokenRepository,
    queue,
  )
}
