/**
 * Calculates the next week number and year based on the current week number and year.
 * @param {number} weekNumber - The current week number.
 * @param {number} year - The current year.
 * @return {object} - Object containing the next week number and year.
 */
import {useNumberOfWeeks} from "@/composables/useNumberOfWeeks";

export function useNextWeek(weekNumber, year) {
    const totalWeeks = useNumberOfWeeks(year);
    let intWeekNumber = parseInt(weekNumber, 10);
    let nextWeekNumber;
    let nextYear = year;

    if (weekNumber >= totalWeeks) {
        nextWeekNumber = 1;
        nextYear++;
    } else {
        nextWeekNumber = intWeekNumber + 1;
    }
    return {week: nextWeekNumber, year: nextYear};
}

