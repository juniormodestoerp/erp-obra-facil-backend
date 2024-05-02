import { Setting as RawSetting } from '@prisma/client'

import { UniqueEntityID } from '@core/domain/entities/unique-entity-id'

import { Setting } from '@modules/settings/entities/setting'

export class PrismaSettingsMapper {
  static toPrisma(setting: Setting) {
    return {
      id: setting.id,
      userId: setting.userId,
      fieldName: setting.fieldName,
      isFieldEnable: setting.isFieldEnable,
      isFieldRequired: setting.isFieldRequired,
      title: setting.title,
      description: setting.description,
      createdAt: setting.createdAt,
      updatedAt: setting.updatedAt,
      deletedAt: setting.deletedAt,
    }
  }

  static toDomain(raw: RawSetting): Setting {
    return Setting.create(
      {
        userId: raw.userId,
        fieldName: raw.fieldName,
        isFieldEnable: raw.isFieldEnable,
        isFieldRequired: raw.isFieldRequired,
        title: raw.title,
        description: raw.description,
        createdAt: raw.createdAt,
        updatedAt: raw.createdAt,
        deletedAt: raw.createdAt ?? undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
