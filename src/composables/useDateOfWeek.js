// used to finde the start (offset = 1) or end (offset = 5) of a week
export function useDateOfWeek(date, offset) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay() + offset,
    )
}
