import {  } from '@modules/transactions/entities/transaction'

export class TransactionViewModel {
  static toHTTP(setting: Setting) {
    return {
      id: setting.id,
      userId: setting.userId,
      fieldName: setting.fieldName,
      isFieldEnable: setting.isFieldEnable,
      isFieldRequired: setting.isFieldRequired,
      title: setting.title,
      description: setting.description,
      createdAt: setting.createdAt,
    }
  }
}
