export interface IFindManyTransactionsDTO {
  pageIndex: number
  userId: string
  searchTerm?: string
}

export interface ITransactionsWhereClauses {
  userId?: string
  deletedAt: null
  OR?: Array<
    | { name?: { contains: string; mode: 'insensitive' } }
    | { description?: { contains: string; mode: 'insensitive' } }
    | { categoryId?: { contains: string; mode: 'insensitive' } }
    | { establishmentName?: { contains: string; mode: 'insensitive' } }
    | { bankName?: { contains: string; mode: 'insensitive' } }
    | { paymentMethod?: { contains: string; mode: 'insensitive' } }
    | { status?: { contains: string; mode: 'insensitive' } }
  >
}
