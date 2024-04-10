import 'dotenv/config'
import { z } from 'zod'

import { numbMessage, strMessage } from '@core/utils/custom-zod-error'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number(numbMessage('porta da API')).default(3333),
  JWT_SECRET: z.string(strMessage('segredo JWT')),
  DATABASE_URL: z.string(strMessage('URL do banco de dados')),
  REDIS_PORT: z.coerce.number(numbMessage('porta do redis')),
  REDIS_HOST: z.string(strMessage('host do redis')),
  REDIS_PASS: z.string(strMessage('senha do redis')),
  SEND_GRID_KEY: z.string(strMessage('chave do SendGrid')),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
