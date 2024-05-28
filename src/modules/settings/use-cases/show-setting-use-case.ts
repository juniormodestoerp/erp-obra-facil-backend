import { AppError } from '@core/domain/errors/app-error'

import type { Setting } from '@modules/settings/entities/setting'
import type { SettingsRepository } from '@modules/settings/repositories/settings-repository'

interface Input {
	id: string
	userId: string
}

interface Output {
	setting: Setting
}

export class ShowSettingUseCase {
	constructor(private readonly settingsRepository: SettingsRepository) {}

	async execute({ id, userId }: Input): Promise<Output> {
		const setting = await this.settingsRepository.findById({
			id,
			userId,
		})

		if (!setting) {
			throw new AppError({
				code: 'setting.not_found',
			})
		}

		return {
			setting,
		}
	}
}
