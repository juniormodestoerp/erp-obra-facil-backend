import { IFindSettingByIdDTO } from '@modules/settings/dtos/find-setting-by-id-dto'
import { IFindSettingsByUserIdDTO } from '@modules/settings/dtos/find-settings-by-userid-dto'
import { IFindManySettingsDTO } from '@modules/settings/dtos/find-many-settings-dto'
import { Setting } from '@modules/settings/entities/setting'

export interface SettingsRepository {
  findById({ userId, id }: IFindSettingByIdDTO): Promise<Setting | null>
  findMany({ pageIndex, userId }: IFindManySettingsDTO): Promise<Setting[]>
  count(): Promise<number>
  save(settings: Setting): Promise<void>
  remove({ userId }: IFindSettingsByUserIdDTO): Promise<void>
}
