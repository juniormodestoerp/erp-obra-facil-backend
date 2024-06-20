import type { MultipartFile } from '@fastify/multipart'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { makeCreateConciliationUseCase } from '@modules/conciliations/use-cases/factories/make-create-conciliation-factory'

export async function createConciliationController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        // console.log('Received request:', request)

        if (!request.isMultipart()) {
            console.error('Request is not multipart')
            return reply.status(400).send({ error: 'Request is not multipart' })
        }

        const data = (await request.file({
            limits: { fileSize: 41943040 }, // 40 MB
        })) as MultipartFile

        console.log('File data:', data)

        const createConciliationUseCase = makeCreateConciliationUseCase()

        const { completedTransactions, conflictingTransactions, newTransactions } =
            await createConciliationUseCase.execute({
                user: request.user.data,
                file: data,
            })

        console.log('Use case result:', { completedTransactions, conflictingTransactions, newTransactions })

        return reply.status(201).send({
            completedTransactions,
            conflictingTransactions,
            newTransactions,
        })
    } catch (error) {
        console.error('Error caught in controller:', error)

        if (error instanceof ZodError) {
            return reply.status(400).send({ error: error.errors })
        }
        return reply.status(500).send({ error: 'Error processing file upload' })
    }
}
