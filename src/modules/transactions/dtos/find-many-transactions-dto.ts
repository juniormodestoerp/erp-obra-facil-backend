export interface IFindManyTransactionsDTO {
	pageIndex: number
	userId: string
	searchTerm?: string
}

export interface ITransactionsWhereClauses {
	userId?: string
	deletedAt?: Date | null
	OR?: Array<
		Partial<{
			description: { contains: string; mode: 'insensitive' }
			categoryId: { contains: string; mode: 'insensitive' }
			transferAccount: { contains: string; mode: 'insensitive' }
			card: { contains: string; mode: 'insensitive' }
			contact: { contains: string; mode: 'insensitive' }
			project: { contains: string; mode: 'insensitive' }
			documentNumber: { contains: string; mode: 'insensitive' }
			notes: { contains: string; mode: 'insensitive' }
			bankName: { contains: string; mode: 'insensitive' }
			method: { contains: string; mode: 'insensitive' }
			status: { contains: string; mode: 'insensitive' }
		}>
	>
}
