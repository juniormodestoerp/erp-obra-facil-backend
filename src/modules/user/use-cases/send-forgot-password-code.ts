import { randomUUID } from 'node:crypto'

import { AppError } from '@core/domain/errors/app-error'
import { Utils } from '@core/utils/string'

import { User } from '@modules/user/entities/user'
import { UserToken } from '@modules/user/entities/user-token'
import { UserRepository } from '@modules/user/repositories/user-repository'
import { UserTokensRepository } from '@modules/user/repositories/user-tokens-respository'

import { Queue } from '@shared/infra/providers/queue'
import { jobs } from '@shared/infra/queue/jobs'

interface Input {
  protocol: string
  hostname: string
  document: string | undefined
  email: string | undefined
}

type Output = void

export class SendForgotPasswordCodeUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userTokenRepository: UserTokensRepository,
    private readonly queueProvider: Queue,
  ) {}

  async execute({
    protocol,
    hostname,
    document,
    email,
  }: Input): Promise<Output> {
    if ((document && email) || (!document && !email)) {
      throw new AppError({
        code: 'authenticate.invalid_credentials',
      })
    }

    let user: User | undefined

    if (document && !email) {
      user = await this.userRepository.findByDocument(document)
    } else if (email && !document) {
      user = await this.userRepository.findByEmail(email)
    }

    if (!user) {
      throw new AppError({
        code: 'user.not_found',
      })
    }

    if (
      (email && user.email.value !== email) ||
      (document && user.document.value !== document)
    ) {
      throw new AppError({
        code: 'user.not_found',
      })
    }

    const code = Utils.GenerateRandomCode(6)

    const userToken = UserToken.create({
      userId: user.id,
      token: randomUUID(),
      code,
      usage: false,
    })

    await this.userTokenRepository.create(userToken)

    const resetPasswordLink = new URL(
      `${protocol}://${hostname}/reset-password`,
    )
    resetPasswordLink.searchParams.set('token', userToken.token)
    resetPasswordLink.searchParams.set('code', userToken.code)

    this.queueProvider.add(jobs.SendForgotPasswordCode.key, {
      email: user.email.value,
      name: user.name,
      resetPasswordLink,
    })
  }
}
