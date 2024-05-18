import { IFindSettingByIdDTO } from '@modules/settings/dtos/find-setting-by-id-dto'
import { IFindManySettingsDTO } from '@modules/settings/dtos/find-many-settings-dto'
import { Setting } from '@modules/settings/entities/setting'

export interface SettingsRepository {
  findById({ userId, id }: IFindSettingByIdDTO): Promise<Setting | null>
  findMany({ pageIndex, userId }: IFindManySettingsDTO): Promise<Setting[]>
  count(): Promise<number>
  save(contact: Setting): Promise<void>
  remove({ userId, id }: IFindSettingByIdDTO): Promise<void>
}
