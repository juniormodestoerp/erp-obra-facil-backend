import { BullProvider } from '@shared/infra/providers/queue/bull'

const queue = new BullProvider()

queue.processQueue()

console.log('Queue is running!')
