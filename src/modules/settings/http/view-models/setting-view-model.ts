import { Setting } from '@modules/settings/entities/setting'

export class SettingViewModel {
  static toHTTP(setting: Setting) {
    return {
      id: setting.id,
      userId: setting.userId,
      fieldName: setting.fieldName,
      isFieldEnable: setting.isFieldEnable,
      isFieldRequired: setting.isFieldRequired,
      title: setting.title,
      description: setting.description,
      createdAt: setting.createdAt.toISOString(),
    }
  }
}
