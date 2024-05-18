import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { numbMessage } from '@core/utils/custom-zod-error'

import { makeFetchSettingsUseCase } from '@modules/settings/use-cases/factories/make-fetch-settings-factory'
import { SettingViewModel } from '@modules/settings/http/view-models/setting-view-model'

import { env } from '@shared/infra/config/env'

const querySchema = z.object({
  pageIndex: z.coerce
    .number(numbMessage('índice da página'))
    .int({ message: 'O índice da página deve ser um número inteiro.' })
    .default(1),
})

export async function fetchSettings(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { pageIndex } = querySchema.parse(request.query)

  const fetchSettingsUseCase = makeFetchSettingsUseCase()

  const { settings, totalCount } = await fetchSettingsUseCase.execute({
    pageIndex,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    settings: settings.map((setting) => SettingViewModel.toHTTP(setting) ?? []),
    meta: {
      pageIndex,
      perPage: env.PER_PAGE,
      totalCount,
    },
  })
}
