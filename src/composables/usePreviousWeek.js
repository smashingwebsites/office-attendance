/**
 * Calculates the previous week number and year based on the current date.
 * @param {Date} date - The current date.
 * @return {object} - Object containing the previous week number and year.
 */
import {useNumberOfWeeks} from "@/composables/useNumberOfWeeks";

export function usePreviousWeek(date) {
    const year = date.getFullYear();
    let weekNumber = getWeekNumber(date);
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

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    let dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
}
