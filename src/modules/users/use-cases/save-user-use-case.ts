import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { AppError } from '@core/domain/errors/app-error'

import { User } from '@modules/users/entities/user'
import { UsersRepository } from '@modules/users/repositories/user-repository'

interface Input {
  id: string
  name: string
  email: string
  phone: string
}

export class SaveUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ id, name, email, phone }: Input): Promise<void> {
    const user = await this.usersRepository.findById({
      id,
    })

    if (!user) {
      throw new AppError({
        code: 'user.not_found',
      })
    }

    const [emailExists, phoneExists] = await Promise.all([
      this.usersRepository.findByEmail(email),
      this.usersRepository.findByPhone(phone),
    ])

    if (emailExists)
      throw new AppError({
        code: 'email.already_exists',
      })

    if (phoneExists)
      throw new AppError({
        code: 'phone.already_exists',
      })

    const updatedUser = User.create(
      {
        name: name ?? user.name,
        document: user.document,
        email: email ?? user.email,
        phone: phone ?? user.phone,
        password: user.password,
        birthDate: user.birthDate,
        role: user.role,
        status: user.status,
        settings: user.settings,
      },
      new UniqueEntityID(id),
    )

    await this.usersRepository.save(updatedUser)
  }
}
