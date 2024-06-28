import { AppError } from '@core/domain/errors/app-error';
import { prisma } from '@shared/infra/database/prisma';
import { subMonths } from 'date-fns';

interface Input {
	userId: string;
}

interface IInvoice {
	id: string;
	amount: number;
	date: string;
	description: string;
}

interface IStats {
	name: string;
	value: string;
	change: string;
	changeType: string;
}

interface Output {
	stats: IStats[];
	overdueInvoices: IInvoice[];
	outstandingInvoices: IInvoice[];
}

export class InicialPageUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const userExists = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!userExists) {
			throw new AppError({
				code: 'user.not_found',
			});
		}

		const currentMonth = new Date();
		const previousMonth = subMonths(currentMonth, 1);

		const currentRevenue = await this.getSumAmount(userId, 'revenue', 'completed', currentMonth);
		const previousRevenue = await this.getSumAmount(userId, 'revenue', 'completed', previousMonth);

		const currentOverdueInvoices = await this.getSumAmount(userId, 'invoice', 'overdue', currentMonth);
		const previousOverdueInvoices = await this.getSumAmount(userId, 'invoice', 'overdue', previousMonth);

		const currentOutstandingInvoices = await this.getSumAmount(userId, 'invoice', 'outstanding', currentMonth);
		const previousOutstandingInvoices = await this.getSumAmount(userId, 'invoice', 'outstanding', previousMonth);

		const currentExpenses = await this.getSumAmount(userId, 'expense', 'completed', currentMonth);
		const previousExpenses = await this.getSumAmount(userId, 'expense', 'completed', previousMonth);

		const overdueInvoices = await this.getInvoices(userId, 'invoice', 'overdue');
		const outstandingInvoices = await this.getInvoices(userId, 'invoice', 'outstanding');

		const stats: IStats[] = [
			this.createStat('Receita', currentRevenue, previousRevenue),
			this.createStat('Faturas pendentes', currentOverdueInvoices, previousOverdueInvoices),
			this.createStat('Faturas em atraso', currentOutstandingInvoices, previousOutstandingInvoices),
			this.createStat('Despesas', currentExpenses, previousExpenses),
		];

		return { stats, overdueInvoices, outstandingInvoices };
	}

	private async getSumAmount(userId: string, type: string, status: string, date: Date): Promise<number> {
		const result = await prisma.transaction.aggregate({
			_sum: { amount: true },
			where: {
				userId,
				type,
				status,
				date: {
					gte: new Date(date.getFullYear(), date.getMonth(), 1),
					lt: new Date(date.getFullYear(), date.getMonth() + 1, 1),
				},
			},
		});
		console.log(result._sum.amount);
		
		return result._sum.amount || 0;
	}

	private async getInvoices(userId: string, type: string, status: string): Promise<IInvoice[]> {
		const invoices = await prisma.transaction.findMany({
			where: {
				userId,
				type,
				status,
			},
			select: {
				id: true,
				amount: true,
				date: true,
				description: true,
			},
			orderBy: {
				date: 'asc',
			},
			take: 10,
		});

		return invoices.map(invoice => ({
			...invoice,
			date: invoice.date.toISOString(),
		}));
	}

	private createStat(name: string, currentValue: number, previousValue: number): IStats {
		const change = currentValue - previousValue;
		const changePercentage = previousValue !== 0 ? (change / previousValue) * 100 : 0;
		const changeType = change >= 0 ? 'positive' : 'negative';
		return {
			name,
			value: `$${currentValue.toFixed(2)}`,
			change: `${changePercentage.toFixed(2)}%`,
			changeType,
		};
	}
}
