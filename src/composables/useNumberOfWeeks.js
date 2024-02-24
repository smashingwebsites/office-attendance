
/**
 * Calculates the number of weeks in a given year.
 *
 * @param {number} y - The year for which to calculate the number of weeks.
 * @return {number} The number of weeks in the given year.
 */
export function useNumberOfWeeks(y) {
    let d,
        isLeap;

    d = new Date(y, 0, 1);
    isLeap = new Date(y, 1, 29).getMonth() === 1;

    //check for a Jan 1 that's a Thursday or a leap year and a Jan 1 that's a Wednesday
    return d.getDay() === 4 || (isLeap && d.getDay() === 3) ? 53 : 52
}
