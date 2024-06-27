import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-repository'
import { PrismaUserTokensRepository } from '@modules/users/repositories/prisma/repositories/user-tokens-repository'

import { SendForgotPasswordCodeUseCase } from '@modules/users/use-cases/send-forgot-password-code-use-case'

import { BullProvider } from '@shared/infra/providers/queue/bull'

export function makeSendForgotPasswordCodeUseCase() {
	const usersRepository = new PrismaUsersRepository()
	const userTokenRepository = new PrismaUserTokensRepository()
	const queue = new BullProvider()

	return new SendForgotPasswordCodeUseCase(
		usersRepository,
		userTokenRepository,
		queue,
	)
}
