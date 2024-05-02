import { Email } from '@core/domain/entities/value-object/email'
import { AppError } from '@core/domain/errors/app-error'

import { User } from '@modules/users/entities/user'
import { UsersRepository } from '@modules/users/repositories/user-repository'

import { Hash } from '@shared/infra/providers/hash'

interface Input {
  email: Email
  password: string
}

interface Output {
  user: User
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hash: Hash,
  ) {}

  async execute({ email, password }: Input): Promise<Output> {
    const user = await this.usersRepository.findByEmail(email.value)
    if (!user) {
      throw new AppError({
        code: 'authenticate.invalid_credentials',
      })
    }

    if (!user.password) {
      throw new AppError({
        code: 'authenticate.invalid_credentials',
      })
    }

    const doesPasswordMatches = await this.hash.compare(password, user.password)
    if (!doesPasswordMatches) {
      throw new AppError({
        code: 'authenticate.invalid_credentials',
      })
    }

    return {
      user,
    }
  }
}
