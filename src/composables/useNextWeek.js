/**
 * Calculates the next week number and year based on the current date.
 * @param {Date} date - The current date.
 * @return {object} - Object containing the next week number and year.
 */
import {useNumberOfWeeks} from "@/composables/useNumberOfWeeks";
import {useWeekNumber} from "@/composables/useWeekNumber";

export function useNextWeek(date) {
    const year = date.getFullYear();
    const totalWeeks = useNumberOfWeeks(year);
    const weekNumber = useWeekNumber(date);
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

