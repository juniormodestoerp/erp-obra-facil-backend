import { AppError } from '@core/domain/errors/app-error'

import { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
  userId: string
}

export class RemoveUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: Input): Promise<void> {
    const user = await this.usersRepository.findById({
      userId,
    })

    if (!user) {
      throw new AppError({
        code: 'user.not_found',
      })
    }

    await this.usersRepository.remove({
      userId,
    })
  }
}
