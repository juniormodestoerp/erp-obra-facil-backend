import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'

import { User, UserRole } from '@modules/users/entities/user'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'
import { Setting } from '@modules/settings/entities/setting'
import { PrismaSettingsRepository } from '@modules/settings/repositories/prisma/repositories/settings-respository'

import { settingsOptions } from '@shared/infra/database/data'
import { Bcrypt } from '@shared/infra/providers/hash/bcrypt'
import { prisma } from '@shared/infra/database/prisma'

async function seed() {
  const usersRepository = new PrismaUsersRepository()
  const settingsRepository = new PrismaSettingsRepository()
  const hash = new Bcrypt()
  const userDocument = new Document('91498396321', 'CPF')
  const passwordHashed = await hash.generate('algumaSenha123!')

  const userExists = await usersRepository.findByDocument(userDocument.value)

  if (!userExists) {
    const user = User.create({
      name: 'Junior Modesto',
      document: userDocument,
      email: new Email('juniormodesto@gmail.com'),
      phone: '+5511985644756',
      birthDate: new Date('1995-06-10'),
      password: passwordHashed,
      role: UserRole.ADMIN,
      status: 'active',
    })

    await usersRepository.save(user)

    const settings = await settingsRepository.count()

    if (settings === 0) {
      settingsOptions.forEach(async (option) => {
        const setting = Setting.create({
          userId: user.id,
          fieldName: option.fieldName,
          isFieldEnable: option.isFieldEnable,
          isFieldRequired: option.isFieldRequired,
          title: option.title,
          description: option.description,
        })
        await settingsRepository.save(setting)
      })
    }

    console.log(
      '\nUser created!\n\nCPF:',
      user.document.value,
      '\nPassword:',
      'algumaSenha123!\n',
    )
  }
}

seed().then(() => {
  console.log('Database seed completed!')
  prisma.$disconnect()
})
