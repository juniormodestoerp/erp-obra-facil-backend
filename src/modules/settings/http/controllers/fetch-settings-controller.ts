import type { FastifyReply, FastifyRequest } from 'fastify'

import { SettingViewModel } from '@modules/settings/http/view-models/setting-view-model'
import { makeFetchSettingsUseCase } from '@modules/settings/use-cases/factories/make-fetch-settings-factory'

export async function fetchSettings(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const fetchSettingsUseCase = makeFetchSettingsUseCase()

	const { settings } = await fetchSettingsUseCase.execute({
		userId: request.user.sub,
	})

	return reply.status(200).send(settings.map((setting) => SettingViewModel.toHTTP(setting)))
}
