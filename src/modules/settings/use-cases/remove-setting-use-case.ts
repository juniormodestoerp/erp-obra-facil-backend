import { AppError } from '@core/domain/errors/app-error'

import { SettingsRepository } from '@modules/settings/repositories/settings-repository'

interface Input {
  userId: string
  id: string
}

export class RemoveSettingUseCase {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async execute({ userId, id }: Input): Promise<void> {
    const clinic = await this.settingsRepository.findById({
      userId,
      id,
    })

    if (!clinic) {
      throw new AppError({
        code: 'setting.not_found',
      })
    }

    await this.settingsRepository.remove({
      userId,
      id,
    })
  }
}
