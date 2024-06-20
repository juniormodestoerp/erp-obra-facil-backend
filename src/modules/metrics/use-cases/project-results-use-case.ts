import { AppError } from '@core/domain/errors/app-error'

import { prisma } from '@shared/infra/database/prisma';

interface Input {
	userId: string
}

interface IProjectResult {
  project: string | null;
  totalAmount: number;
}

interface Output {
  transactions: IProjectResult[];
}

export class ProjectResultsUseCase {
	async execute({ userId }: Input): Promise<Output> {
		const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      select: {
        associatedProjects: true,
        totalAmount: true,
      },
    });

		if (!transactions || transactions.length === 0) {
			throw new AppError({
				code: 'transaction.not_found',
			})
		}

		const totalsByProject = transactions.reduce((acc, transaction) => {
      const project = transaction.associatedProjects || 'unknown';
      if (!acc[project]) {
        acc[project] = 0;
      }
      acc[project] += transaction.totalAmount;
      return acc;
    }, {} as Record<string, number>);

    const result: IProjectResult[] = Object.keys(totalsByProject).map(
      (project) => ({
        project: project === 'unknown' ? null : project,
        totalAmount: totalsByProject[project],
      })
    );

    return {
      transactions: result,
    };
	}
}
