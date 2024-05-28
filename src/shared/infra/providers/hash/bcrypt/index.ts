import { compare as bcryptCompare, hash } from 'bcrypt'

import type { Hash } from '@shared/infra/providers/hash'

export class Bcrypt implements Hash {
	async generate(str: string): Promise<string> {
		return hash(str, 8)
	}

	async compare(str: string, hash: string): Promise<boolean> {
		return bcryptCompare(str, hash)
	}
}
