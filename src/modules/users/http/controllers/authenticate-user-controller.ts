import type { SignOptions } from '@fastify/jwt'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { Document } from '@core/domain/entities/value-object/document'
import { strMessage } from '@core/utils/custom-zod-error'

import { UserViewModel } from '@modules/users/http/view-models/user-view-model'
import { makeAuthenticateUserUseCase } from '@modules/users/use-cases/factories/make-authenticate-user-factory'

import { env } from '@shared/infra/config/env'

const schema = z.object({
	document: z
		.string(strMessage('CPF'))
		.length(11, { message: 'O campo CPF deve conter 11 caracteres.' })
		.regex(/^[0-9]+$/, {
			message: 'O campo CPF deve conter apenas números.',
		}),
	password: z
		.string(strMessage('senha'))
		.regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
			message:
				'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número, um caractere especial e no mínimo 8 caracteres.',
		}),
})

export async function authenticateUserController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { document, password } = schema.parse(request.body)

	const authenticateUserUseCase = makeAuthenticateUserUseCase()

	const { user } = await authenticateUserUseCase.execute({
		document: new Document(document, 'CPF').value,
		password,
	})

	const signOptions: SignOptions = {
		expiresIn: '10d',
		sub: user.id,
		notBefore: 0,
	}

	const accessToken = await reply.accessSign(
		{
			sub: user.id,
		},
		signOptions,
	)

	const refreshToken = await reply.refreshSign(
		{
			sub: user.id,
		},
		{ ...signOptions, expiresIn: '28d' },
	)

	request.user = {
		data: user,
		sub: user.id,
		role: user.role,
	}

	reply.setCookie('accessToken', accessToken, {
		path: '/',
		httpOnly: true,
		secure: env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 3600,
	})

	reply.setCookie('refreshToken', refreshToken, {
		path: '/',
		httpOnly: true,
		secure: env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 604800,
	})

	return reply.status(200).send(UserViewModel.toHTTP(user))
}
