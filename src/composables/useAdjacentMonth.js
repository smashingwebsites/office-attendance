
/**
 * Calculates the month and year of the adjacent month based on the given date and offset.
 *
 * @param {Date} date - The date to calculate the adjacent month from.
 * @param {number} offset - The number of months to offset from the given date. A positive offset moves forward, while a negative offset moves backward.
 * @return {Object} - An object containing the month and year of the adjacent month.
 *                   - month: The month of the adjacent month (ranging from 1 to 12).
 *                   - year: The year of the adjacent month.
 */
export function useAdjacentMonth(date, offset) {
    let d = new Date(date);
    d.setMonth(d.getMonth() + offset);
    return {
        month: d.getMonth() + 1, year: d.getFullYear()
    }
}
