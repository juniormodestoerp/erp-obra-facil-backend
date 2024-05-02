import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'
import { Setting } from '@modules/settings/entities/setting'
import { PrismaSettingsRepository } from '@modules/settings/repositories/prisma/repositories/settings-respository'
import { User, UserRole } from '@modules/users/entities/user'
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/repositories/user-respository'
import { settingsOptions } from '@shared/infra/database/data'
import { prisma } from '@shared/infra/database/prisma'
import { Bcrypt } from '@shared/infra/providers/hash/bcrypt'

async function seed() {
  const usersRepository = new PrismaUsersRepository()
  const settingsRepository = new PrismaSettingsRepository()
  const hash = new Bcrypt()

  const passwordHashed = await hash.generate('algumaSenha123!')

  const user = User.create({
    name: 'Junior Modesto',
    document: new Document('91498396321', 'CPF'),
    email: new Email('juniormodesto@gmail.com'),
    phone: '+5511985644756',
    password: passwordHashed,
    role: UserRole.ADMIN,
  })
  await usersRepository.create(user)

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

  console.log(
    '\nUser created!\n\nE-mail:',
    user.email.value,
    '\nPassword:',
    'algumaSenha123!\n',
  )
}

seed().then(() => {
  console.log('Database seed completed!')
  prisma.$disconnect()
})
