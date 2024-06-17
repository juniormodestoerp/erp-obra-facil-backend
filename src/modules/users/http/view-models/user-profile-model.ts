import type { User } from '@modules/users/entities/user'

export class UserProfileViewModel {
	static toHTTP(user: User) {
		return {
			id: user.id,
			name: user.name,
			document: user.document,
			email: user.email,
			phone: user.phone,
			zipCode: user?.address?.zipCode,
			state: user?.address?.state,
			city: user?.address?.city,
			neighborhood: user?.address?.neighborhood,
			street: user?.address?.street,
			number: user?.address?.number,
			complement: user?.address?.complement,
			profilePicture: user?.profilePicture,
			createdAt: user.createdAt.toISOString(),
		}
	}
}
