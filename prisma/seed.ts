import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'

import { Setting } from '@modules/settings/entities/setting'
import { User, UserRole } from '@modules/users/entities/user'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'

import { settingsOptions } from '@shared/infra/database/data'
import { Bcrypt } from '@shared/infra/providers/hash/bcrypt'
import { prisma } from '@shared/infra/database/prisma'

async function seed() {
  const usersRepository = new PrismaUsersRepository()

  const hash = new Bcrypt()

  const document = new Document('09899291676', 'CPF').value
  const email = new Email('bruno.clara@yahoo.com').value

  const [existsDocument, existsEmail] = await Promise.all([
    usersRepository.findByDocument(document),
    usersRepository.findByEmail(email),
  ])

  const passwordHashed = await hash.generate('algumaSenha123!')

  if (!existsDocument && !existsEmail) {
    const user = User.create({
      name: 'Bruno Vilefort',
      document,
      email,
      phone: '+5511985644756',
      birthDate: new Date('1995-06-10'),
      password: passwordHashed,
      role: UserRole.ADMIN,
      status: 'active',
      settings: [],
    })

    user.settings = settingsOptions.map((option) => {
      return Setting.create({
        userId: user.id,
        fieldName: option.fieldName,
        isFieldEnable: option.isFieldEnable,
        isFieldRequired: option.isFieldRequired,
        title: option.title,
        description: option.description,
      })
    })

    await usersRepository.create(user)

    console.log(`
User created with success 🎉

Username: 09899291676
Password: algumaSenha123!
    `)
  }
}

seed().then(() => {
  console.log('Database seed completed!')
  prisma.$disconnect()
})
