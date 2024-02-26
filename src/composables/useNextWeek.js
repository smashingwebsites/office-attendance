/**
 * Calculates the next week number and year based on the current date.
 * @param {Date} date - The current date.
 * @return {object} - Object containing the next week number and year.
 */
import {useNumberOfWeeks} from "@/composables/useNumberOfWeeks";

export function useNextWeek(date) {
    const year = date.getFullYear();
    const totalWeeks = useNumberOfWeeks(year);
    const weekNumber = getWeekNumber(date);
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

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    let dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
}