import type { FastifyJWTOptions } from '@fastify/jwt'

import { env } from '@shared/infra/config/env'

export const JwtAccessTokenConfig: FastifyJWTOptions = {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'accessToken',
		signed: false,
	},
	namespace: 'access',
	jwtVerify: 'accessVerify',
	jwtSign: 'accessSign',
}

export const JwtRefreshTokenConfig: FastifyJWTOptions = {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	namespace: 'refresh',
	jwtVerify: 'refreshVerify',
	jwtSign: 'refreshSign',
}
