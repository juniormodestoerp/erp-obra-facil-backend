import { AppError } from '@core/domain/errors/app-error'

import { UserRepository } from '@modules/user/repositories/user-repository'
import { UserTokensRepository } from '@modules/user/repositories/user-tokens-respository'

import { DateInstance } from '@shared/infra/providers/date'
import { Hash } from '@shared/infra/providers/hash'

interface Input {
  token: string
  code: string
  password: string
}

type Output = Promise<void>

export class ResetForgotPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userTokenRepository: UserTokensRepository,
    private readonly hash: Hash,
  ) {}

  async execute({ token, code, password }: Input): Promise<Output> {
    const userToken = await this.userTokenRepository.findByToken(token)
    if (!userToken) {
      throw new AppError({
        code: 'token.not_found',
      })
    }

    if (userToken.usage) {
      throw new AppError({
        code: 'token.already_used',
      })
    }

    if (userToken.code !== code) {
      throw new AppError({
        code: 'token.invalid',
      })
    }

    const expiredAt = DateInstance.add({
      date: userToken.createdAt!,
      unit: 3,
      type: 'hour',
    })

    if (DateInstance.isAfter({ date: new Date(), dateToCompare: expiredAt })) {
      throw new AppError({
        code: 'token.expired',
      })
    }

    const user = await this.userRepository.findById(userToken.userId)
    if (!user) {
      throw new AppError({
        code: 'user.not_found',
      })
    }

    user.password = await this.hash.generate(password)
    userToken.usage = true

    await this.userRepository.save(user)
    await this.userTokenRepository.save(userToken)
  }
}
