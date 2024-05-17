import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'

import { User, UserRole } from '@modules/users/entities/user'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'
import { Setting } from '@modules/settings/entities/setting'

import { settingsOptions } from '@shared/infra/database/data'
import { prisma } from '@shared/infra/database/prisma'
import { Bcrypt } from '@shared/infra/providers/hash/bcrypt'

async function seed() {
  const usersRepository = new PrismaUsersRepository()
  const hash = new Bcrypt()
  const passwordHashed = await hash.generate('algumaSenha123!')

  const document = new Document('09899291676', 'CPF').value
  const email = new Email('juniormodesto@gmail.com').value

  const [documentExists, emailExists] = await Promise.all([
    usersRepository.findByDocument(document),
    usersRepository.findByEmail(email),
  ])

  if (!documentExists && !emailExists) {
    const user = User.create({
      name: 'Junior Modesto',
      document,
      email,
      phone: '+5511985644756',
      birthDate: new Date('1995-06-10'),
      password: passwordHashed,
      role: UserRole.ADMIN,
      status: 'active',
      settings: [],
    })

    user.settings = await Promise.all(
      settingsOptions.map(async (option) => {
        return Setting.create({
          userId: user.id,
          fieldName: option.fieldName,
          isFieldEnable: option.isFieldEnable,
          isFieldRequired: option.isFieldRequired,
          title: option.title,
          description: option.description,
        })
      }),
    )

    await usersRepository.create(user)

    console.log(`
      Usuário criado com sucesso! 🎉

      Usuário: 09899291676
      Senha: algumaSenha123!
      `)
  }
}

seed().then(() => {
  console.log('Database seed completed!')
  prisma.$disconnect()
})
