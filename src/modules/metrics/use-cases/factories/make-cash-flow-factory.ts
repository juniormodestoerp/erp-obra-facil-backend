import { PrismaTransactionsRepository } from '@modules/transactions/repositories/prisma/repositories/transactions-respository'

import { CashFlowUseCase } from '@modules/metrics/use-cases/cash-flow-use-case'

export function makeCashFlowUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()

	return new CashFlowUseCase(transactionsRepository)
}
