import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'
import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'

import { RawUserWithSettings } from '@modules/settings/dtos/raw-settings-dto'
import { User, UserRole } from '@modules/users/entities/user'
import { PrismaSettingsMapper } from '@modules/settings/repositories/prisma/mappers/prisma-settings-mapper'

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      document: user.document,
      email: user.email,
      phone: user.phone,
      birthDate: user.birthDate,
      password: user.password,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      settings:
        {
          create: user.settings.map((setting) => ({
            id: setting.id,
            fieldName: setting.fieldName,
            isFieldEnable: setting.isFieldEnable,
            isFieldRequired: setting.isFieldRequired,
            title: setting.title,
            description: setting.description,
            createdAt: setting.createdAt,
            updatedAt: setting.updatedAt,
            deletedAt: setting.deletedAt,
          })),
        } ?? [],
    }
  }

  static toDomain(raw: RawUserWithSettings): User {
    return User.create(
      {
        name: raw.name,
        document: new Document(raw.document, 'CPF').value,
        email: new Email(raw.email).value,
        phone: raw.phone,
        birthDate: raw.birthDate,
        password: raw.password,
        role: raw.role as UserRole,
        status: raw.status,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
        settings: PrismaSettingsMapper.toDomainArray(raw.settings) ?? [],
      },
      new UniqueEntityID(raw.id),
    )
  }
}
