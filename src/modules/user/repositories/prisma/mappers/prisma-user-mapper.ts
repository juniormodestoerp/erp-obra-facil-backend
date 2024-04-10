import { User as RawUser } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'

import { User } from '@modules/user/entities/user'

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      document: user.document.value,
      email: user.email?.value,
      password: user.password,
      phone: user.phone,
      role: user.role,
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
        email: new Email(raw.email ?? ''),
        password: raw.password,
        phone: raw.phone,
        role: raw.role ?? undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.createdAt,
        deletedAt: raw.createdAt ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
