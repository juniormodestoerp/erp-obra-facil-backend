/* eslint-disable @typescript-eslint/no-explicit-any */
import Bull, { type Queue } from 'bull'

import { env } from '@shared/infra/config/env'
import RedisConfig from '@shared/infra/config/redis'
import type {
	Queue as IQueue,
	QueueJobOptions,
	QueueProps,
} from '@shared/infra/providers/queue'
import type { Runnable } from '@shared/infra/providers/queue'
import { jobs } from '@shared/infra/queue/jobs'

interface IQueuData {
	bull: Queue
	run(data: QueueProps): Promise<void>
}

interface IQueueJob {
	[key: string]: IQueuData
}

export type JobsKeys = keyof typeof jobs
const _jobs: Array<Runnable> = []

for (const _job of Object.keys(jobs)) {
	const currentJob = jobs[_job as JobsKeys]
	_jobs.push(currentJob.job)
}

export class BullProvider implements IQueue {
	private queues: IQueueJob = {}

	constructor() {
		this.init()
	}

	init(): void {
		for (const { key, run } of _jobs) {
			this.queues[key] = {
				bull: new Bull(key, {
					redis: {
						...RedisConfig.config.redis,
						port: env.REDIS_PORT,
						password: env.REDIS_PASS,
					},
				}),
				run,
			}
		}
	}

	add(
		queue: string,
		job: object,
		options?: QueueJobOptions | undefined,
	): Promise<Bull.Job<any>> {
		return this.queues[queue].bull.add(job, options)
	}

	processQueue(): void {
		for (const job of _jobs) {
			const { bull, run } = this.queues[job.key]
			bull.on('failed', this.handleFailure).process(run)
		}
	}

	handleFailure(job: Bull.Job<any>, err: Error): void {
		console.log(`Queue ${job.queue.name}: FAILED`, err)
	}
}
