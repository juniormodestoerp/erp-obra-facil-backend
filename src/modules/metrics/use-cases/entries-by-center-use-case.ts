import { AppError } from '@core/domain/errors/app-error';
import { prisma } from '@shared/infra/database/prisma';

interface Input {
  userId: string;
}

interface ICenterTotal {
  costAndProfitCenters: string | null;
  totalAmount: number;
}

interface Output {
  transactions: ICenterTotal[];
}

export class EntriesByCenterUseCase {
  async execute({ userId }: Input): Promise<Output> {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      select: {
        costAndProfitCenters: true,
        totalAmount: true,
      },
    });

    if (!transactions || transactions.length === 0) {
      throw new AppError({
        code: 'transaction.not_found',
        message: 'No transactions found for the given user.',
      });
    }

    const totalsByCenter = transactions.reduce((acc, transaction) => {
      const centerId = transaction.costAndProfitCenters || 'uncategorized';
      if (!acc[centerId]) {
        acc[centerId] = 0;
      }
      acc[centerId] += transaction.totalAmount;
      return acc;
    }, {} as Record<string, number>);

    const result: ICenterTotal[] = Object.keys(totalsByCenter).map(
      (costAndProfitCenters) => ({
        costAndProfitCenters:
          costAndProfitCenters === 'uncategorized' ? null : costAndProfitCenters,
        totalAmount: totalsByCenter[costAndProfitCenters],
      })
    );

    return {
      transactions: result,
    };
  }
}
