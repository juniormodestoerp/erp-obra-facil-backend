import type { IFindManySettingsDTO } from '@modules/settings/dtos/find-many-settings-dto'
import type { IFindSettingByIdDTO } from '@modules/settings/dtos/find-setting-by-id-dto'
import type { Setting } from '@modules/settings/entities/setting'

export interface SettingsRepository {
	findById({ userId, id }: IFindSettingByIdDTO): Promise<Setting | null>
	findMany({ userId }: IFindManySettingsDTO): Promise<Setting[]>
	count(): Promise<number>
	save(contact: Setting): Promise<void>
	remove({ userId, id }: IFindSettingByIdDTO): Promise<void>
}
