export interface Cache {
	set(
		key: string,
		value: string,
		expirationInSeconds?: number,
	): Promise<boolean>
	get<T>(key: string): Promise<T | null>
	delete(key: string): Promise<boolean>
	quit(): void
	getInstance(): Cache
}
