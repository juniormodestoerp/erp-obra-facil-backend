import { PrismaClient } from '@prisma/client'

import { IFindSettingByIdDTO } from '@modules/settings/dtos/find-setting-by-id-dto'
import { IFindManySettingsDTO } from '@modules/settings/dtos/find-many-settings-dto'
import { Setting } from '@modules/settings/entities/setting'
import { PrismaSettingsMapper } from '@modules/settings/repositories/prisma/mappers/prisma-settings-mapper'
import { SettingsRepository } from '@modules/settings/repositories/settings-repository'

import { env } from '@shared/infra/config/env'
import { prisma } from '@shared/infra/database/prisma'

export class PrismaSettingsRepository implements SettingsRepository {
  private repository: PrismaClient

  constructor() {
    this.repository = prisma
  }

  async findById({ userId, id }: IFindSettingByIdDTO): Promise<Setting | null> {
    const setting = await this.repository.setting.findUnique({
      where: {
        userId,
        id,
        deletedAt: null,
      },
    })

    if (!setting) {
      return null
    }

    return PrismaSettingsMapper.toDomain(setting)
  }

  async findMany({
    pageIndex,
    userId,
  }: IFindManySettingsDTO): Promise<Setting[]> {
    const skip = (pageIndex - 1) * 20 ?? env.PER_PAGE

    const settings = await this.repository.setting.findMany({
      where: {
        userId,
      },
      skip,
      take: 20 ?? env.PER_PAGE,
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

  async save(setting: Setting): Promise<void> {
    const prismaSettingData = PrismaSettingsMapper.toPrisma(setting)

    await this.repository.setting.update({
      where: {
        userId: setting.userId,
        id: setting.id,
        deletedAt: null,
      },
      data: prismaSettingData,
    })
  }

  async remove({ userId, id }: IFindSettingByIdDTO): Promise<void> {
    await this.repository.setting.update({
      where: {
        userId,
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
