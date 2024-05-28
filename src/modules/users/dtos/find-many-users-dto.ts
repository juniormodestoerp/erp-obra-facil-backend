import type { UserRole } from '@modules/users/entities/user'

export interface IFindManyUsersDTO {
	pageIndex: number
	role?: UserRole
	deletedAt?: boolean
}
