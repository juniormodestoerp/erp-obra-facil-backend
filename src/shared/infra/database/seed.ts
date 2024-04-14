import { prisma } from '@shared/infra/database/prisma'

async function seed() {}

seed().then(() => {
  console.log('Database seed completed!')
  prisma.$disconnect()
})
