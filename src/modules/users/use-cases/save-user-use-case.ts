import { AppError } from '@core/domain/errors/app-error'
import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'
import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { User, UserRole } from '@modules/users/entities/user'
import { UsersRepository } from '@modules/users/repositories/user-repository'
import { Setting } from '@modules/settings/entities/setting'
import { SettingsRepository } from '@modules/settings/repositories/settings-repository'

import { Hash } from '@shared/infra/providers/hash'
import { settingsOptions } from '@shared/infra/database/data'

interface Input {
  id?: string
  name: string
  document: Document
  email: Email
  birthDate: Date
  phone: string
  password: string
  role?: UserRole
  status?: string
}

export class SaveUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly settingsRepository: SettingsRepository,
    private readonly hash: Hash,
  ) {}

  async execute({
    id,
    name,
    document,
    password,
    email,
    phone,
    birthDate,
    role,
    status,
  }: Input): Promise<void> {
    if (id !== undefined) {
      const passwordHashed = await this.hash.generate(password)

      const userToUpdate = User.create(
        {
          name,
          document,
          email,
          phone,
          password: passwordHashed,
          birthDate,
          role: role ?? UserRole.USER,
          status: status ?? 'active',
        },
        new UniqueEntityID(id),
      )

      await this.usersRepository.save(userToUpdate)
    } else {
      const [documentExists, emailExists, phoneExists] = await Promise.all([
        this.usersRepository.findByDocument(document.value),
        this.usersRepository.findByEmail(email.value),
        this.usersRepository.findByPhone(phone),
      ])

      if (documentExists)
        throw new AppError({
          code: 'document.already_exists',
        })

      if (emailExists)
        throw new AppError({
          code: 'email.already_exists',
        })

      if (phoneExists)
        throw new AppError({
          code: 'phone.already_exists',
        })

      if (!password)
        throw new AppError({
          code: 'password.required',
        })

      const passwordHashed = await this.hash.generate(password)

      const user = User.create({
        name,
        document,
        email,
        phone,
        password: passwordHashed,
        birthDate,
        role: role ?? UserRole.USER,
        status: status ?? 'active',
      })

      await this.usersRepository.save(user)

      const settings = await this.settingsRepository.count()

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
          await this.settingsRepository.save(setting)
        })
      }
    }
  }
}
