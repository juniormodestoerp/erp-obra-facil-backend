import { AppError } from '@core/domain/errors/app-error'

import type { Setting } from '@modules/settings/entities/setting'
import type { SettingsRepository } from '@modules/settings/repositories/settings-repository'
import type { DomainUsersRepository } from '@modules/users/repositories/domain-users-repository'

interface Input {
	userId: string
}

interface Output {
	settings: Setting[]
}

export class FetchSettingsUseCase {
	constructor(
		private readonly settingsRepository: SettingsRepository,
		private readonly usersRepository: DomainUsersRepository,
	) {}

	async execute({ userId }: Input): Promise<Output> {
		const user = await this.usersRepository.findById({
			userId,
		})

		if (!user) {
			throw new AppError({
				code: 'user.not_found',
			})
		}

		const settings = await this.settingsRepository.findMany({
			userId,
		})

		if (settings.length === 0) {
			throw new AppError({
				code: 'setting.not_found',
			})
		}

		return {
			settings,
		}
	}
}
