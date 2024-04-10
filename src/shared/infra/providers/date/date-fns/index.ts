import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isBefore as dateFnsIsBefore,
  isAfter as dateFnsIsAfter,
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
} from 'date-fns'

import {
  AddInput,
  DiffInput,
  IDate,
  IsAfterInput,
  IsBeforeInput,
} from '@shared/infra/providers/date'

export class DateFns implements IDate {
  isBefore({ date, dateToCompare }: IsBeforeInput): boolean {
    return dateFnsIsBefore(date, dateToCompare)
  }

  isAfter({ date, dateToCompare }: IsAfterInput): boolean {
    return dateFnsIsAfter(date, dateToCompare)
  }

  add({ date, unit, type }: AddInput): Date {
    switch (type) {
      case 'second':
        return addSeconds(date, unit)
      case 'minute':
        return addMinutes(date, unit)
      case 'hour':
        return addHours(date, unit)
      case 'day':
        return addDays(date, unit)
      case 'month':
        return addMonths(date, unit)
      case 'year':
        return addYears(date, unit)
      default:
        throw new Error('Unsupported date unit')
    }
  }

  diff({ date, dateToCompare, type }: DiffInput): number {
    switch (type) {
      case 'second':
        return differenceInSeconds(date, dateToCompare)
      case 'minute':
        return differenceInMinutes(date, dateToCompare)
      case 'hour':
        return differenceInHours(date, dateToCompare)
      case 'day':
        return differenceInDays(date, dateToCompare)
      case 'month':
        return differenceInMonths(date, dateToCompare)
      case 'year':
        return differenceInYears(date, dateToCompare)
      default:
        throw new Error('Unsupported date unit')
    }
  }
}
