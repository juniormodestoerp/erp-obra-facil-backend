import { AppError } from '@core/domain/errors/app-error';

import { prisma } from '@shared/infra/database/prisma';

interface Input {
  userId: string;
}

interface IProjectTotal {
  projectId: string | null;
  totalAmount: number;
}

interface Output {
  totalsByProject: IProjectTotal[];
}

export class TotalsByProjectUseCase {
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
      const projectId = transaction.associatedProjects || 'uncategorized';
      if (!acc[projectId]) {
        acc[projectId] = 0;
      }
      acc[projectId] += transaction.totalAmount;
      return acc;
    }, {} as Record<string, number>);

    const result: IProjectTotal[] = Object.keys(totalsByProject).map(
      (projectId) => ({
        projectId: projectId === 'uncategorized' ? null : projectId,
        totalAmount: totalsByProject[projectId],
      })
    );

    return {
      totalsByProject: result,
    };
	}
}
