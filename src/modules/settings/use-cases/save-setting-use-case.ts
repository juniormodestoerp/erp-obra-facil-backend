import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { Setting } from '@modules/settings/entities/setting'
import { SettingsRepository } from '@modules/settings/repositories/settings-repository'
import { UsersRepository } from '@modules/users/repositories/user-repository'

type Input = {
  id?: string
  userId: string
  fieldName: string
  isFieldEnable: boolean
  isFieldRequired: boolean
  title: string
  description: string
}

type Output = {
  setting: Setting
}

export class SaveSettingUseCase {
  constructor(
    private readonly settingsRepository: SettingsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    id,
    userId,
    fieldName,
    isFieldEnable,
    isFieldRequired,
    title,
    description,
  }: Input): Promise<Output> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new AppError({
        code: 'user.not_found',
      })
    }

    const setting = Setting.create(
      {
        userId,
        fieldName,
        isFieldEnable,
        isFieldRequired,
        title,
        description,
      },
      new UniqueEntityID(id),
    )
    await this.settingsRepository.save(setting)

    return {
      setting,
    }
  }
}
