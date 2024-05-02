import { IFindByIdDTO } from '@modules/settings/dtos/find-by-id-dto'
import { IFindManyDTO } from '@modules/settings/dtos/find-many-dto'
import { Setting } from '@modules/settings/entities/setting'

export interface SettingsRepository {
  findById({ id, userId }: IFindByIdDTO): Promise<Setting | null>
  findMany({ pageIndex, userId }: IFindManyDTO): Promise<Setting[]>
  count(): Promise<number>
  save(contact: Setting): Promise<Setting>
  remove(id: string): Promise<void>
}
