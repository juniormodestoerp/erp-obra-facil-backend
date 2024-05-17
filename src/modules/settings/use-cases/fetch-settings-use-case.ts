import { AppError } from '@core/domain/errors/app-error'

import { Setting } from '@modules/settings/entities/setting'
import { SettingsRepository } from '@modules/settings/repositories/settings-repository'
import { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
  pageIndex: number
  userId: string
}

interface Output {
  settings: Setting[]
  totalCount: number
}

export class FetchSettingsUseCase {
  constructor(
    private readonly settingsRepository: SettingsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ pageIndex, userId }: Input): Promise<Output> {
    const user = await this.usersRepository.findById({
      id: userId,
    })

    if (!user) {
      throw new AppError({
        code: 'user.not_found',
      })
    }

    const settings = await this.settingsRepository.findMany({
      pageIndex,
      userId,
    })

    if (settings.length === 0) {
      throw new AppError({
        code: 'setting.not_found',
      })
    }

    const totalCount = await this.settingsRepository.count()

    return {
      settings,
      totalCount,
    }
  }
}
