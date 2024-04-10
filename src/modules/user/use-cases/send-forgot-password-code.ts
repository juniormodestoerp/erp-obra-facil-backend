import { randomUUID } from 'node:crypto'

import { AppError } from '@core/domain/errors/app-error'
import { Utils } from '@core/utils/string'

import { CustomerPayload } from '@modules/customer/dtos/customer-payload'
import { UserToken } from '@modules/user/entities/user-token'
import { UserRepository } from '@modules/user/repositories/user-repository'
import { UserTokensRepository } from '@modules/user/repositories/user-tokens-respository'

import { Queue } from '@shared/infra/providers/queue'
import { jobs } from '@shared/infra/queue/jobs'

interface SendForgotPasswordCodeInput {
  customer: CustomerPayload
  document: string
  email: string
}

export class SendForgotPasswordCodeUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userTokenRepository: UserTokensRepository,
    private readonly queueProvider: Queue,
  ) {}

  async execute({
    customer: { data: customer, config },
    document,
    email,
  }: SendForgotPasswordCodeInput): Promise<void> {
    const user = await this.userRepository.findByDocument(document, customer.id)

    if (!user) {
      throw new AppError({
        code: 'user.not_found',
      })
    }

    if (user?.email?.value !== email) {
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

    this.queueProvider.add(jobs.UserSendVerificationCodeForgotPassword.key, {
      customer: {
        data: customer.toRaw(),
        config: config.toRaw(),
      },
      email: user?.email?.value,
      name: user.name,
      commonName: user.commonName,
      token: userToken.token,
      code,
    })
  }
}
