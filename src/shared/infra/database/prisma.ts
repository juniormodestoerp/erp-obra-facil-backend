import { PrismaClient } from '@prisma/client'
import { env } from '@shared/infra/config/env'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query'] : [],
  errorFormat: 'minimal',
})
