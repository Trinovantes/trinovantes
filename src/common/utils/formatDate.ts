import { Dayjs } from 'dayjs'

export function formatDate(date?: Dayjs): string {
    return date?.format('YYYY/MM/DD') ?? ''
}
