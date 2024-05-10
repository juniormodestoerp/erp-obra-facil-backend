import { AppError } from '@core/domain/errors/app-error'

import { SettingsRepository } from '@modules/settings/repositories/settings-repository'

type Input = {
  id: string
  userId: string
}

type Output = void

export class RemoveSettingUseCase {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async execute({ id, userId }: Input): Promise<Output> {
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
