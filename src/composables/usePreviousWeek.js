/**
 * Calculates the previous week number and year based on the current date.
 * @param {Date} date - The current date.
 * @return {object} - Object containing the previous week number and year.
 */
import {useNumberOfWeeks} from "@/composables/useNumberOfWeeks";
import {useWeekNumber} from "@/composables/useWeekNumber";

export function usePreviousWeek(date) {
    const year = date.getFullYear();
    let weekNumber = useWeekNumber(date);
    let intWeekNumber = parseInt(weekNumber, 10);
    let prevWeekNumber;
    let prevYear = year;

    if (weekNumber <= 1) {
        prevYear--;
        prevWeekNumber = useNumberOfWeeks(prevYear);
    } else {
        prevWeekNumber = intWeekNumber - 1;
    }

    return {week: prevWeekNumber, year: prevYear};
}
