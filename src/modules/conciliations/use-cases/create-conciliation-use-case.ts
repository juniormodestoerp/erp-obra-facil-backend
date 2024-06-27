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

interface IMapTransactions {
	categoryId: string
	file: any
	userId: string
}

interface IProcessOFXTransactions {
	filePath: string
	existingTransactions: Transaction[]
}

interface IProcessOFXTransactionsOutput {
	newTransactions: Transaction[]
	conflictingTransactions: Transaction[]
	completedTransactions: Transaction[]
}

interface Input {
	user: User
	file: MultipartFile
}

interface Output {
	newTransactions: Transaction[]
	conflictingTransactions: Transaction[]
	completedTransactions: Transaction[]
}

export class CreateConciliationUseCase {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
		private readonly categoriesRepository: CategoriesRepository,
	) {}

	async execute({ user, file }: Input): Promise<Output> {
		const UPLOAD_DIR = join(
			__dirname,
			'..',
			'..',
			'..',
			'..',
			'src',
			'uploads',
			'ofx-statement',
		)

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

		console.log('Starting file upload process...')

		const newFileName = `${Utils.NormalizeName(user.name)}-${user.id}-${file.filename}`
		const filePath = join(UPLOAD_DIR, newFileName)

		await pump(file.file, createWriteStream(filePath))

		console.log('File uploaded to:', filePath)

		console.log('user', user.id)

		const category = await this.categoriesRepository.findByName({
			userId: user.id,
			name: 'padrão',
		})

		if (!category) {
			throw new AppError({
				code: 'category.not_found',
			})
		}

		const mapTransaction = async ({
			file,
			userId,
			categoryId,
		}: IMapTransactions): Promise<Partial<Transaction>> => {
			const datePattern = /(\d{4})(\d{2})(\d{2})\d{6}\[-\d+:BRT\]/
			const match = file.DTPOSTED.match(datePattern)
			const date = match
				? new Date(`${match[1]}-${match[2]}-${match[3]}`)
				: new Date()

			const accountType =
				file.ACCTTYPE === 'CHECKING'
					? 'Conta corrente'
					: file.ACCTTYPE === 'SAVINGS'
						? 'Conta poupança'
						: 'Cartão de crédito'

			return {
				userId,
				fitId: file.FITID,
				accountType,
				name: file.MEMO.split(' - ')[0],
				description: file.MEMO,
				categoryId,
				establishmentName: file.MEMO.split(' - ')[1] || '',
				bankName: file.MEMO.split(' - ')[3] || '',
				date,
				previousBalance: 0, // Ajustar conforme necessário
				amount: Number.parseFloat(file.TRNAMT),
				currentBalance: 0, // Ajustar conforme necessário
				method: file.TRNTYPE === 'DEBIT' ? 'debit' : 'credit',
				competencyDate: null,
				centers: null,
				tags: [],
				documentNumber: file.FITID,
				associatedContracts: null,
				associatedProjects: null,
				additionalComments: null,
				status: 'completed', // Status padrão
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			}
		}

		console.log('Mapping transactions...')

		const processOFXTransactions = async ({
			filePath,
			existingTransactions,
		}: IProcessOFXTransactions): Promise<IProcessOFXTransactionsOutput> => {
			const ofxData = readFileSync(filePath, 'utf-8')
			const parsedData = await parse(ofxData)

			const ofxTransactions =
				parsedData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN

			const newTransactions: Transaction[] = []
			const conflictingTransactions: Transaction[] = []
			const completedTransactions: Transaction[] = []

			for (const ofxTransaction of ofxTransactions) {
				const mappedTransaction = await mapTransaction({
					categoryId: category?.categoryId as string,
					file: ofxTransaction,
					userId: user.id,
				})

				const existingTransaction = existingTransactions.find(
					(txn) =>
						txn.date.getTime() === mappedTransaction?.date?.getTime() &&
						txn.fitId === mappedTransaction.fitId,
				)

				if (!existingTransaction) {
					const transaction = Transaction.create(mappedTransaction as any)
					newTransactions.push(transaction)
					// Removido o salvamento no banco de dados
				} else if (
					existingTransaction.amount !== mappedTransaction.amount ||
					existingTransaction.description !== mappedTransaction.description
				) {
					conflictingTransactions.push(existingTransaction)
				} else {
					completedTransactions.push(existingTransaction)
				}
			}

			console.log('Transactions processed:', {
				newTransactions,
				conflictingTransactions,
				completedTransactions,
			})

			return { newTransactions, conflictingTransactions, completedTransactions }
		}

		const existingTransactions: Transaction[] =
			await this.transactionsRepository.fetchAll({
				userId: user.id,
			})

		console.log('Existing transactions:', existingTransactions)

		try {
			const result = await processOFXTransactions({
				filePath,
				existingTransactions,
			})

			console.log('Processing result:', result)

			return {
				newTransactions: result.newTransactions,
				conflictingTransactions: result.conflictingTransactions,
				completedTransactions: result.completedTransactions,
			}
		} catch (error) {
			console.error('Error caught in use case:', error)
			throw new AppError({
				code: 'file.cannot_read_ofx',
			})
		}
	}
}
