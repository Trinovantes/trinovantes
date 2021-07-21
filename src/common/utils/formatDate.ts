import { Dayjs } from 'dayjs'

export function formatDate(date?: Dayjs): string {
    if (!date) {
        return ''
    }

    return date?.utc().format('YYYY/MM/DD')
}

export function formatDateDisplay(date?: Dayjs): string {
    if (!date) {
        return ''
    }

    const formatter = new Intl.DateTimeFormat('en', {
        dateStyle: 'medium',
        timeZone: 'UTC',
    } as unknown as Intl.DateTimeFormatOptions)

    return formatter.format(date.toDate())
}
