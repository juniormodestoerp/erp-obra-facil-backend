/* eslint-disable @typescript-eslint/no-explicit-any */
import Bull, { Queue } from 'bull'

import RedisConfig from '@shared/infra/config/redis'
import { env } from '@shared/infra/config/env'
import type {
  Queue as IQueue,
  QueueJobOptions,
  QueueProps,
} from '@shared/infra/providers/queue'
import { Runnable } from '@shared/infra/providers/queue'
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

Object.keys(jobs).forEach((_job) => {
  const currentJob = jobs[_job as JobsKeys]
  _jobs.push(currentJob.job)
})

export class BullProvider implements IQueue {
  private queues: IQueueJob = {}

  constructor() {
    this.init()
  }

  init(): void {
    _jobs.forEach(({ key, run }) => {
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
    })
  }

  add(
    queue: string,
    job: object,
    options?: QueueJobOptions | undefined,
  ): Promise<Bull.Job<any>> {
    return this.queues[queue].bull.add(job, options)
  }

  processQueue(): void {
    _jobs.forEach((job) => {
      const { bull, run } = this.queues[job.key]
      bull.on('failed', this.handleFailure).process(run)
    })
  }

  handleFailure(job: Bull.Job<any>, err: Error): void {
    console.log(`Queue ${job.queue.name}: FAILED`, err)
  }
}
