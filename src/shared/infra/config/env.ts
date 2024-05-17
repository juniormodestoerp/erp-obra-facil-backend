import { z } from 'zod'

import { numbMessage, strMessage } from '@core/utils/custom-zod-error'

const envSchema = z.object({
  APP_NAME: z.coerce.string(strMessage('app name')),
  APP_DESCRIPTION: z.coerce.string(strMessage('app description')),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  PER_PAGE: z.coerce
    .number(numbMessage('quantidade de itens por página'))
    .default(12),
  PORT: z.coerce.number(numbMessage('porta da api')).default(8080),
  JWT_SECRET: z.string(strMessage('segredo jwt')),
  DATABASE_URL: z.string(strMessage('url do banco de dados')),
  REDIS_PORT: z.coerce.number(numbMessage('porta do redis')),
  REDIS_HOST: z.string(strMessage('host do redis')),
  REDIS_PASS: z.string(strMessage('senha do redis')),
  SEND_GRID_KEY: z.string(strMessage('chave do sendgrid')),
  RESEND_API_KEY: z.string(strMessage('chave do resend')),
  CLOUDFLARE_ENDPOINT: z
    .string(strMessage('endpoint do cloudflare'))
    .url('O endpoint deve ser um url válida.'),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(
    strMessage('id da chave de acesso do cloudflare'),
  ),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(
    strMessage('chave de acesso secreta do cloudflare'),
  ),
  BUCKET_NAME: z.string(strMessage('nome do bucket')),
  SENTRY_DSN: z.string(strMessage('dsn do sentry')),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('❌ Invalid environment variables.')
}

export const env = _env.data
