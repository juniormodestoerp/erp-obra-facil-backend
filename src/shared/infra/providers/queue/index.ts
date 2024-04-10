import { Job } from 'bull'

export interface QueueJobOptions {
  priority?: number | undefined
  delay?: number | undefined
  attempts?: number | undefined
  timeout?: number | undefined
}

export interface Queue {
  init(): void
  add(queue: string, job: object, options?: QueueJobOptions): Promise<Job>
  processQueue(): void
  handleFailure(job: Job, err: Error): void
}

export interface QueueProps {
  data: object
}

export abstract class Runnable {
  abstract get key(): string
  abstract run(props: QueueProps): Promise<void>
}
