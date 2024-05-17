import { User as PrismaUser, Setting as PrismaSetting } from '@prisma/client'

export type RawUserWithSettings = PrismaUser & {
  settings: PrismaSetting[]
}
