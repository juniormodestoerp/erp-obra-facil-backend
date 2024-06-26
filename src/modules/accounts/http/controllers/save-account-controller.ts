import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import {
	boolMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error'

import { LimitType } from '@modules/accounts/entities/account'
import { AccountsViewModel } from '@modules/accounts/http/view-models/accounts-view-model'
import { makeSaveAccountUseCase } from '@modules/accounts/use-cases/factories/make-save-account-factory'

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

export async function saveAccountController(
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

	const saveAccountUseCase = makeSaveAccountUseCase()

	const { account } = await saveAccountUseCase.execute({
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

	return reply.status(200).send(AccountsViewModel.toHTTP(account))
}
