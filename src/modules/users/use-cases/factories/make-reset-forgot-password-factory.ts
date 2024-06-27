import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/prisma-users-repository'
import { PrismaUserTokensRepository } from '@modules/users/repositories/prisma/repositories/prisma-user-tokens-repository'

import { ResetForgotPasswordUseCase } from '@modules/users/use-cases/reset-forgot-password-use-case'

import { Bcrypt } from '@shared/infra/providers/hash/bcrypt'

export function makeResetForgotPasswordUseCase() {
	const usersRepository = new PrismaUsersRepository()
	const usersTokenRepository = new PrismaUserTokensRepository()
	const hash = new Bcrypt()

	return new ResetForgotPasswordUseCase(
		usersRepository,
		usersTokenRepository,
		hash,
	)
}
