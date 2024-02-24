<script setup>
import {useDateOfWeek} from "@/composables/useDateOfWeek";
import {watch, ref, computed, onUpdated} from 'vue'
import {store} from "@/store";
import {useRouter, useRoute} from 'vue-router'
import {useNextWeek} from "@/composables/useNextWeek";

const route = useRoute()
console.log(route.params)
console.log("-----------------")

const year = route.params.year;
const weekNumber = route.params.nr;

const startOfWeek = computed(() => useDateOfWeek(store.currentDate, 1).toLocaleDateString())
const endOfWeek = computed(() => useDateOfWeek(store.currentDate, 5).toDateString())


// Function to get the week number from a Date object
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// todo: put in useDateOfWeek
// todo: vlt gleich einfacheres datum zurück geben
const getWeekDates = (weekNumber, year) => {
  const firstDayOfYear = new Date(year, 0, 1 + (weekNumber - 1) * 7);
  const weekStartDayOffset = firstDayOfYear.getDate() - firstDayOfYear.getDay() + 1;
  const startDate = new Date(firstDayOfYear.setDate(weekStartDayOffset));
  const weekEndDayOffset = firstDayOfYear.getDate() - firstDayOfYear.getDay() + 7;
  const endDate = new Date(firstDayOfYear.setDate(weekEndDayOffset));

  return {startDate, endDate};
}


const {week: nextWeekNumber} = useNextWeek(weekNumber, year);
const {year: nextWeekYear} = useNextWeek(weekNumber, year);


// We create a computed property currentWeek which returns the week number of store.currentDate
const currentWeek = computed(() => getWeekNumber(new Date(store.currentDate)))

// Now we create a computed property nextWeek which returns the week number after currentWeek
//const nextWeek = computed(() => currentWeek.value + 1)

</script>
<template>
  <div class="nav">
    <div class="nav__arrow nav__arrow--prev" @click="store.prevWeek()">&larr;</div>
    <div class="nav__date">{{ startOfWeek }} - {{ endOfWeek }}</div>
    <router-link :to="{ name: 'week', params: { nr: nextWeekNumber, year: nextWeekYear }}"
                 class="nav__arrow nav__arrow--next">&rarr;
    </router-link>
  </div>
</template>

<style scoped>
.nav {
  --_block-padding: .5rem;
  --_inline-padding: .75rem;
  display: flex;
  gap: .2rem;
  line-height: 1;
}

.nav__date {
  font-size: 1.2rem;
  font-weight: 500;
  padding: var(--_block-padding) var(--_inline-padding);
  background-color: var(--clr-light-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
}

.nav .nav__arrow {
  padding: var(--_block-padding) var(--_inline-padding);
  background-color: var(--clr-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--transition-duration) var(--transition-timing);
  cursor: pointer;
}

.nav .nav__arrow:hover {
  background-color: var(--clr-light-grey);
}

.nav .nav__arrow.nav__arrow--prev {
  border-radius: var(--border-radius-lg) var(--border-radius) var(--border-radius) var(--border-radius-lg);
}

.nav .nav__arrow.nav__arrow--next {
  border-radius: var(--border-radius) var(--border-radius-lg) var(--border-radius-lg) var(--border-radius);
}
</style>
