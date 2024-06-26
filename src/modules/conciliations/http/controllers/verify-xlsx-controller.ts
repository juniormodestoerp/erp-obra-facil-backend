import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import {
	dateMessage,
	numbMessage,
	strMessage,
} from '@core/utils/custom-zod-error';
import { prisma } from '@shared/infra/database/prisma';
import { Utils } from '@core/utils/string';
import { randomUUID } from 'node:crypto';

interface ITransactionInput {
	id?: string;
	date: string;
	amount: number;
	description: string;
	account: string | null;
	transferAccount: string | null;
	card: string | null;
	category: string | null;
	subcategory: string | null;
	contact: string | null;
	center: string | null;
	project: string | null;
	method: string | null;
	documentNumber: string | null;
	notes: string | null;
	competenceDate: string | null;
	tags: string | null;
}

const bodySchema = z
	.object({
		date: z.string(dateMessage('data')),
		amount: z.number(numbMessage('valor')),
		description: z.string(strMessage('descrição')),
		account: z.string(strMessage('conta')).nullable(),
		transferAccount: z.string(strMessage('conta transferência')).nullable(),
		card: z.string(strMessage('cartão')).nullable(),
		category: z.string(strMessage('Categoria')).nullable(),
		subcategory: z.string(strMessage('Subcategoria')).nullable(),
		contact: z.string(strMessage('Contato')).nullable(),
		center: z.string(strMessage('Centro')).nullable(),
		project: z.string(strMessage('Projeto')).nullable(),
		method: z.string(strMessage('Forma')).nullable(),
		documentNumber: z.string(strMessage('N. Documento')).nullable(),
		notes: z.string(strMessage('Observações')).nullable(),
		competenceDate: z.coerce.string(dateMessage('Data Competência')).nullable(),
		tags: z.string(strMessage('Tags')).nullable(),
	})
	.array();

export async function verifyXlsxController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const parsedBody = bodySchema.parse(request.body);
	const formattedBody = parsedBody.map((transaction) => ({
		...transaction,
		date: Utils.parseDate(transaction.date),
		competenceDate: transaction.competenceDate
			? Utils.parseDate(transaction.competenceDate)
			: null,
	}));

	async function filterNewTransactions(
		newTransactions: ITransactionInput[],
	): Promise<{
		newTransactions: ITransactionInput[];
		existingTransactions: ITransactionInput[];
	}> {
		const existingTransactions = await prisma.transaction.findMany({
			where: {
				OR: newTransactions.map((transaction) => ({
					date: transaction.date,
					amount: transaction.amount,
					description: transaction.description,
				})),
			},
			select: {
				date: true,
				amount: true,
				description: true,
			},
		});

		const existingSet = new Set(
			existingTransactions.map(
				(transaction) =>
					`${transaction.date.toISOString()}-${transaction.amount}-${transaction.description}`,
			),
		);

		const newTrans: ITransactionInput[] = [];
		const existingTrans: ITransactionInput[] = [];

		for (const transaction of newTransactions) {
			const transactionKey = `${transaction.date}-${transaction.amount}-${transaction.description}`;
			if (existingSet.has(transactionKey)) {
				existingTrans.push(transaction);
			} else {
				newTrans.push(transaction);
			}
		}
		return {
			newTransactions: newTrans,
			existingTransactions: existingTrans,
		};
	}

	const result = await filterNewTransactions(formattedBody);

	const addIdToTransactions = (transactions: ITransactionInput[]) =>
		transactions.map(transaction => ({
			...transaction,
			id: randomUUID(),
		}));

	const newTransactionsWithId = addIdToTransactions(result.newTransactions);
	const conflictingTransactionsWithId = addIdToTransactions(result.existingTransactions);

	reply.status(200).send({
		newTransactions: newTransactionsWithId,
		conflictingTransactions: conflictingTransactionsWithId,
	});
}

// date
// amount
// description
// account
// transferAccount
// card
// category
// subcategory
// contact
// center
// project
// method
// documentNumber
// notes
// competenceDate
// tags