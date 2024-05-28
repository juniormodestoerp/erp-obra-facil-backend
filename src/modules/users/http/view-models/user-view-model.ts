import type { User } from '@modules/users/entities/user'

export class UserViewModel {
	static toHTTP(user: User) {
		return {
			id: user.id,
			name: user.name,
			document: user.document,
			email: user.email,
			phone: user.phone,
			birthDate: user.birthDate,
			role: user.role,
			status: user.status,
			createdAt: user.createdAt.toISOString(),
		}
	}
}
