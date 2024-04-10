import { User } from '@modules/user/entities/user'

export class UserViewModel {
  static async toHTTP(user: User) {
    return {
      id: user.id,
      document: user.document.value,
      name: user.name,
      email: user.email.value,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    }
  }
}
