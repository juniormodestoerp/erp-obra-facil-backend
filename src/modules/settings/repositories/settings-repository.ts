import { IFindManyDTO } from '@modules/settings/dtos/find-many-settings-dto'
import { IFindByIdDTO } from '@modules/settings/dtos/find-setting-by-id-dto'
import { Setting } from '@modules/settings/entities/setting'

export interface SettingsRepository {
  findById({ id, userId }: IFindByIdDTO): Promise<Setting | null>
  findMany({ pageIndex, userId }: IFindManyDTO): Promise<Setting[]>
  count(): Promise<number>
  save(contact: Setting): Promise<void>
  remove(id: string): Promise<void>
}
