// used to finde the start (offset = 1) or end (offset = 5) of a week
/**
 * Returns a new date object with the offset number of days relative to the start of the week of the provided date.
 *
 * @param {Date} date - The date for which the offset is applied.
 * @param {number} offset - The number of days to offset from the start of the week. Positive values are in the future, negative values are in the past.
 * @return {Date} - A new date object with the offset applied.
 */
export function useDateOfWeek(date, offset) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay() + offset,
    )
}
