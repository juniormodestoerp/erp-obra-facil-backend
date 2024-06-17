import type { SignOptions } from '@fastify/jwt'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Document } from '@core/domain/entities/value-object/document'
import { Email } from '@core/domain/entities/value-object/email'
import { strMessage } from '@core/utils/custom-zod-error'

import { UserViewModel } from '@modules/users/http/view-models/user-view-model'
import { makeCreateUserUseCase } from '@modules/users/use-cases/factories/make-create-user-factory'

import { env } from '@shared/infra/config/env'

const bodySchema = z.object({
	name: z
		.string(strMessage('nome'))
		.min(1, { message: 'O campo nome é obrigatório.' }),
	document: z
		.string(strMessage('CPF'))
		.length(11, { message: 'O campo CPF deve conter 11 caracteres.' })
		.regex(/^[0-9.\-/]+$/, {
			message: 'O campo CPF deve conter apenas números.',
		}),
	birthDate: z.coerce.date(strMessage('data de nascimento')),
	email: z.string(strMessage('e-mail')).email('O campo e-mail é inválido.'),
	phone: z
		.string(strMessage('telefone'))
		.length(14, { message: 'O campo telefone deve conter 14 caracteres.' }),
	password: z
		.string(strMessage('senha'))
		.regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
			message:
				'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número, um caractere especial e no mínimo 8 caracteres.',
		}),
})

export async function createUserController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name, document, email, birthDate, phone, password } =
		bodySchema.parse(request.body)

	const createUserUseCase = makeCreateUserUseCase()

	const { user } = await createUserUseCase.execute({
		name,
		document: new Document(document, 'CPF').value,
		email: new Email(email).value,
		birthDate,
		phone,
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

	return reply.status(200).send({
		accessToken,
		user: UserViewModel.toHTTP(user),
	})
}
