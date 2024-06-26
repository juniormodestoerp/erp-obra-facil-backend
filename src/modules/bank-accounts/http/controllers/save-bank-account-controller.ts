import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { boolMessage, numbMessage, strMessage } from '@core/utils/custom-zod-error'

import { BankAccountsViewModel } from '@modules/bank-accounts/http/view-models/bank-accounts-view-model'
import { makeSaveBankAccountUseCase } from '@modules/bank-accounts/use-cases/factories/make-save-bank-account-factory'
import { LimitType } from '@modules/bank-accounts/entities/bank-account'

const paramsSchema = z.object({
	id: z
		.string(strMessage('identificador da conta'))
		.uuid({
			message: 'O campo identificador da conta deve ser um UUID válido.',
		})
		.min(1, 'O campo identificador da conta é obrigatório.'),
})

const bodySchema = z.object({
	accountType: z
	.string(strMessage('tipo da conta'))
	.min(1, 'O tipo da conta é obrigatório!'),
name: z
	.string(strMessage('nome da conta'))
	.min(1, 'O nome da conta é obrigatório!'),
currency: z.string(strMessage('moeda')).min(1, 'A moeda é obrigatória!'),
logo: z.string(strMessage('logo da conta')).nullable(),
limit: z.number(numbMessage('limit da conta')).nullable(),
limitType: z.nativeEnum(LimitType).nullable(),
dueDateDay: z.string(numbMessage('dia de vencimento')).nullable(),
dueDateFirstInvoice: z
	.string(strMessage('data da primeira fatura'))
	.nullable(),
closingDateInvoice: z
	.number(numbMessage('dias antes do fechamento da fatura'))
	.nullable(),
balanceFirstInvoice: z
	.number(numbMessage('valor da primeira fatura'))
	.nullable(),
isFirstInvoice: z.boolean(boolMessage('primeira fatura')).nullable(),
isCreditCard: z.boolean(boolMessage('cartão de crédito')).nullable(),
initialBalance: z.number(numbMessage('saldo inicial')),
})

export async function saveBankAccountController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = paramsSchema.parse(request.params)

	const {
		accountType,
		name,
		currency,
		logo,
		limit,
		limitType,
		dueDateDay,
		dueDateFirstInvoice,
		closingDateInvoice,
		balanceFirstInvoice,
		isFirstInvoice,
		isCreditCard,
		initialBalance,
	} = bodySchema.parse(request.body)

	const saveBankAccountUseCase = makeSaveBankAccountUseCase()

	const { bankAccount } = await saveBankAccountUseCase.execute({
		id,
		userId: request.user.sub,
		accountType,
		name,
		currency,
		logo,
		limit,
		limitType,
		dueDateDay,
		dueDateFirstInvoice,
		closingDateInvoice,
		balanceFirstInvoice,
		isFirstInvoice,
		isCreditCard,
		initialBalance,
	})

	return reply.status(200).send(BankAccountsViewModel.toHTTP(bankAccount))
}
