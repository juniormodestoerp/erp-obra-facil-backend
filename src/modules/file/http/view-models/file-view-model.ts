import { File } from '@modules/file/entities/file'

export class UserViewModel {
  static async toHTTP(file: File) {
    return {
      id: file.id,
      key: file.key,
      name: file.name,
      contentType: file.contentType,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
      deletedAt: file.deletedAt,
    }
  }
}
