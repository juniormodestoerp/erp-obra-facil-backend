import { AppError } from '@core/domain/errors/app-error'
import { Utils } from '@core/utils/string'
import type { MultipartFile } from '@fastify/multipart'
import type { CategoriesRepository } from '@modules/categories/repositories/categories-repository'

import { createWriteStream, existsSync, mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pipeline } from 'node:stream'
import util from 'node:util'
import { Transaction } from '@modules/transactions/entities/transaction'
import type { TransactionsRepository } from '@modules/transactions/repositories/transactions-repository'
import type { User } from '@modules/users/entities/user'

import { parse } from 'ofx-js'

const pump = util.promisify(pipeline)

interface Input {
	user: User
	file: MultipartFile
}

export class CreateConciliationUseCase {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
		private readonly categoriesRepository: CategoriesRepository,
	) {}

	async execute({ user, file }: Input): Promise<void> {
		const UPLOAD_DIR = join(__dirname, '../../../../src/uploads')

		if (!existsSync(UPLOAD_DIR)) {
			mkdirSync(UPLOAD_DIR, {
				recursive: true,
			})
		}

		if (!file) {
			throw new AppError({
				code: 'file.cannot_download',
			})
		}

		const newFileName = `${Utils.NormalizeName(user.name)}-${user.id}-${
			file.filename
		}`
		const filePath = join(UPLOAD_DIR, newFileName)

		await pump(file.file, createWriteStream(filePath))

		const category = await this.categoriesRepository.findByName({
			userId: user.id,
			name: 'padrão',
		})

		if (!category) {
			throw new AppError({
				code: 'category.not_found',
			})
		}

		// Função auxiliar para mapear transações OFX para a entidade Transaction
		const mapTransaction = (
			ofxTransaction: any,
			userId: string,
			categoryId: string,
		): Partial<Transaction> => {
			const datePattern = /(\d{4})(\d{2})(\d{2})\d{6}\[-\d+:BRT\]/
			const match = ofxTransaction.DTPOSTED.match(datePattern)
			const transactionDate = match
				? new Date(`${match[1]}-${match[2]}-${match[3]}`)
				: new Date()

			return {
				userId,
				fitId: ofxTransaction.FITID,
				trnType: ofxTransaction.TRNTYPE,
				name: ofxTransaction.MEMO.split(' - ')[0],
				description: ofxTransaction.MEMO,
				categoryId,
				establishmentName: ofxTransaction.MEMO.split(' - ')[1] || '',
				bankName: ofxTransaction.MEMO.split(' - ')[3] || '',
				transactionDate,
				previousBalance: 0, // Ajustar conforme necessário
				totalAmount: Number.parseFloat(ofxTransaction.TRNAMT),
				currentBalance: 0, // Ajustar conforme necessário
				paymentMethod: ofxTransaction.TRNTYPE === 'DEBIT' ? 'debit' : 'credit',
				competencyDate: null,
				costAndProfitCenters: null,
				tags: null,
				documentNumber: ofxTransaction.FITID,
				associatedContracts: null,
				associatedProjects: null,
				additionalComments: null,
				status: 'completed', // Status padrão
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			}
		}

		// Função principal para processar transações OFX
		const processOFXTransactions = async (
			ofxFilePath: string,
			userId: string,
			existingTransactions: Transaction[],
		): Promise<{
			newTransactions: Transaction[]
			conflictingTransactions: Transaction[]
		}> => {
			const ofxData = readFileSync(ofxFilePath, 'utf-8')
			const parsedData = await parse(ofxData)

			const ofxTransactions =
				parsedData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN

			const newTransactions: Transaction[] = []
			const conflictingTransactions: Transaction[] = []

			for (const ofxTransaction of ofxTransactions) {
				const mappedTransaction = mapTransaction(
					ofxTransaction,
					userId,
					category.categoryId as string,
				)

				const existingTransaction = existingTransactions.find(
					(txn) =>
						txn.transactionDate.getTime() ===
							mappedTransaction.transactionDate.getTime() &&
						txn.fitId === mappedTransaction.fitId,
				)

				if (!existingTransaction) {
					const transaction = Transaction.create(mappedTransaction)
					newTransactions.push(transaction)
					await this.transactionsRepository.create(transaction)
				} else if (
					existingTransaction.totalAmount !== mappedTransaction.totalAmount ||
					existingTransaction.description !== mappedTransaction.description
				) {
					conflictingTransactions.push(existingTransaction)
				}
			}

			return { newTransactions, conflictingTransactions }
		}

		const existingTransactions: Transaction[] =
			await this.transactionsRepository.fetchAll({
				userId: user.id,
			})

		try {
			const ofxData = readFileSync(filePath, 'utf-8')
			const parsedData = await parse(ofxData)

			const account = parsedData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKACCTFROM
			const transactions =
				parsedData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN

			const result = await processOFXTransactions(
				filePath,
				user.id,
				existingTransactions,
			)

			console.log('New Transactions:', result.newTransactions)
			console.log('Conflicting Transactions:', result.conflictingTransactions)

			console.log(account, transactions)
		} catch (error) {
			throw new AppError({
				code: 'file.cannot_read_ofx',
			})
		}
	}
}
