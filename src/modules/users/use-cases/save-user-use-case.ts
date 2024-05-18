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
    const previusUser = await this.usersRepository.findById({
      userId: id,
    })

    if (!previusUser) {
      throw new AppError({
        code: 'user.not_found',
      })
    }

    const updatedUser = User.create(
      {
        name: name ?? previusUser.name,
        document: previusUser.document,
        email: email ?? previusUser.email,
        phone: phone ?? previusUser.phone,
        password: previusUser.password,
        birthDate: previusUser.birthDate,
        role: previusUser.role,
        status: previusUser.status,
      },
      new UniqueEntityID(id),
    )

    await this.usersRepository.save(updatedUser)
  }
}
