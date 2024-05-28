import { DateFns } from '@shared/infra/providers/date/date-fns'

type DateUnit =
	| 'year'
	| 'month'
	| 'day'
	| 'hour'
	| 'minute'
	| 'second'
	| 'millisecond'

export interface IsBeforeInput {
	date: Date
	dateToCompare: Date
}

export interface IsAfterInput {
	date: Date
	dateToCompare: Date
}

export interface AddInput {
	date: Date
	unit: number
	type: DateUnit
}

export interface DiffInput {
	date: Date
	dateToCompare: Date
	type: DateUnit
}

export interface IDate {
	isBefore({ date, dateToCompare }: IsBeforeInput): boolean
	isAfter({ date, dateToCompare }: IsAfterInput): boolean
	add({ date, unit, type }: AddInput): Date
	diff({ date, dateToCompare, type }: DiffInput): number
}

export const DateInstance = new DateFns()
