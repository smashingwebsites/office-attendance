<script setup>
import {useDateOfWeek} from "@/composables/useDateOfWeek";
import {watch, computed} from 'vue'
import {store} from "@/store";
import {useRoute} from 'vue-router'
import {useNextWeek} from "@/composables/useNextWeek";
import {usePreviousWeek} from "@/composables/usePreviousWeek";

const route = useRoute()

const startOfWeek = computed(() => useDateOfWeek(store.currentDate, 1).toLocaleDateString())
const endOfWeek = computed(() => useDateOfWeek(store.currentDate, 5).toDateString())

const nextWeek = computed(() => useNextWeek(store.currentDate))
const prevWeek = computed(() => usePreviousWeek(store.currentDate))


// Function to get the start date of a week.
function getStartDateOfWeek(weekNumber, year) {
  const date = new Date(year, 0, 2 + (weekNumber - 1) * 7);
  const weekStart = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

  return new Date(date.setDate(weekStart));
}

function setCurrentDateInStore() {
  store.currentDate = new Date(getStartDateOfWeek(route.params.week, route.params.year));
}

watch(() => route.params.week, setCurrentDateInStore, {immediate: true});
</script>
<template>
  <div class="nav">
    <router-link :to="{ name: 'week', params: { week: prevWeek.week, year: prevWeek.year }}"
                 class="nav__arrow nav__arrow--prev">&larr;
    </router-link>
    <div class="nav__date nav__date--week">{{ startOfWeek }} - {{ endOfWeek }}</div>
    <router-link :to="{ name: 'week', params: { week: nextWeek.week, year: nextWeek.year }}"
                 class="nav__arrow nav__arrow--next">&rarr;
    </router-link>
  </div>
</template>
