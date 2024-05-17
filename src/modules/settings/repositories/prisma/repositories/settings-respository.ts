import { PrismaClient } from '@prisma/client'

import { IFindSettingByIdDTO } from '@modules/settings/dtos/find-setting-by-id-dto'
import { IFindSettingsByUserIdDTO } from '@modules/settings/dtos/find-settings-by-userid-dto'
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

  async save(setting: Setting): Promise<void> {
    const prismaSettingData = PrismaSettingsMapper.toPrisma(setting)

    await prisma.$transaction(async (trx) => {
      await trx.setting.update({
        where: {
          userId: prismaSettingData.userId,
          id: prismaSettingData.id,
        },
        data: prismaSettingData,
      })
    })
  }

  async remove({ userId }: IFindSettingsByUserIdDTO): Promise<void> {
    await this.repository.setting.updateMany({
      where: {
        userId,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
