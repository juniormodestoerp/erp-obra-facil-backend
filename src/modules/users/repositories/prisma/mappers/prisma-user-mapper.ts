import { User as RawUser } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'

import { User, UserRole } from '@modules/users/entities/user'

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      document: user.document.value,
      email: user.email.value,
      phone: user.phone,
      birthDate: user.birthDate,
      password: user.password,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    }
  }

  static toDomain(raw: RawUser): User {
    return User.create(
      {
        name: raw.name,
        document: new Document(raw.document, 'CPF'),
        email: new Email(raw.email),
        phone: raw.phone,
        birthDate: raw.birthDate,
        password: raw.password,
        role: raw.role as UserRole,
        status: raw.status,
        createdAt: raw.createdAt,
        updatedAt: raw.createdAt,
        deletedAt: raw.createdAt ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
