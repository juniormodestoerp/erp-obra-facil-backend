import { AppError } from '@core/domain/errors/app-error'

import { SettingsRepository } from '@modules/settings/repositories/settings-repository'

interface Input {
  id: string
  userId: string
}

export class RemoveSettingUseCase {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async execute({ id, userId }: Input): Promise<void> {
    const clinic = await this.settingsRepository.findById({
      id,
      userId,
    })
    if (!clinic) {
      throw new AppError({
        code: 'setting.not_found',
      })
    }

    await this.settingsRepository.remove(id)
  }
}
