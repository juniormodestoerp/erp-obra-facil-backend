import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'
import { AppError } from '@core/domain/errors/app-error'

import { User } from '@modules/users/entities/user'
import { UsersRepository } from '@modules/users/repositories/user-repository'

import { Hash } from '@shared/infra/providers/hash'

interface Input {
  name: string
  document: Document
  password: string
  email: Email
  phone: string
}

interface Output {
  user: User
}

export class RegisterUseCase {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly hash: Hash,
  ) {}

  async execute({
    name,
    document,
    password,
    email,
    phone,
  }: Input): Promise<Output> {
    const documentExists = await this.userRepository.findByDocument(
      document.value,
    )
    if (documentExists) {
      throw new AppError({
        code: 'document.already_exists',
      })
    }

    const emailExists = await this.userRepository.findByEmail(email.value)
    if (emailExists) {
      throw new AppError({
        code: 'email.already_exists',
      })
    }

    const phoneExists = await this.userRepository.findByPhone(phone)
    if (phoneExists) {
      throw new AppError({
        code: 'phone.already_exists',
      })
    }

    if (!password) {
      throw new AppError({
        code: 'password.required',
      })
    }

    const passwordHashed = await this.hash.generate(password)

    const user = User.create({
      document,
      email,
      phone,
      name: User.normalizeName(name),
      password: passwordHashed,
      role: 'USER',
    })

    await this.userRepository.create(user)

    return {
      user,
    }
  }
}
