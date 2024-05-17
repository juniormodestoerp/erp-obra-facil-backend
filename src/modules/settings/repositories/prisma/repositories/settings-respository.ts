import { PrismaClient } from '@prisma/client'

import { IFindByIdDTO } from '@modules/settings/dtos/find-by-id-dto'
import { IFindManyDTO } from '@modules/settings/dtos/find-many-dto'
import { Setting } from '@modules/settings/entities/setting'
import { SettingsRepository } from '@modules/settings/repositories/settings-repository'
import { PrismaSettingsMapper } from '@modules/settings/repositories/prisma/mappers/prisma-settings-mapper'

import { env } from '@shared/infra/config/env'
import { prisma } from '@shared/infra/database/prisma'

export class PrismaSettingsRepository implements SettingsRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async findById({ id, userId }: IFindByIdDTO): Promise<Setting | null> {
    const setting = await this.repository.setting.findUnique({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    })

    if (!setting) {
      return null
    }

    return PrismaSettingsMapper.toDomain(setting)
  }

  async findMany({ pageIndex, userId }: IFindManyDTO): Promise<Setting[]> {
    const skip = (pageIndex - 1) * env.PER_PAGE

    const settings = await this.repository.setting.findMany({
      where: {
        userId,
      },
      skip,
      take: env.PER_PAGE,
      orderBy: {
        updatedAt: 'desc',
      },
    })

    if (!settings) {
      return []
    }

    return settings.map((setting) => PrismaSettingsMapper.toDomain(setting))
  }

  async count(): Promise<number> {
    return await this.repository.setting.count()
  }

  async save(setting: Setting): Promise<Setting> {
    const prismaSettingData = PrismaSettingsMapper.toPrisma(setting)

    const prismaSetting = await this.repository.setting.upsert({
      where: {
        id: setting.id,
        userId: setting.userId,
      },
      create: prismaSettingData,
      update: prismaSettingData,
    })

    return PrismaSettingsMapper.toDomain(prismaSetting)
  }

  async remove(id: string): Promise<void> {
    await this.repository.setting.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
