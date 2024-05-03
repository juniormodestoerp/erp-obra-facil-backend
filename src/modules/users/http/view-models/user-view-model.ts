import { User } from '@modules/users/entities/user'

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      document: user.document.value,
      email: user.email.value,
      phone: user.phone,
      birthDate: user.birthDate,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt.toISOString(),
    }
  }
}
