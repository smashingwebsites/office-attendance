<script setup>
import {computed, ref, watch} from "vue";
import {store} from "@/store";
import Day from "@/components/day-settings/day.vue";

const props = defineProps(['month'])

const daysInMonth = ref([])

const startOfMonth = computed(() => new Date(Date.UTC(store.currentYear, props.month, 1)))
const endOfMonth = computed(() => new Date(store.currentYear, props.month + 1, 0))

const startOfMonthDateObj = new Date(startOfMonth.value);
const endOfMonthDateObj = new Date(endOfMonth.value);

async function getDaysInMonth() {

  daysInMonth.value = [];
  const daysInTotal = endOfMonthDateObj.getDate();

  for (let i = 0; i < daysInTotal; i++) {
    startOfMonthDateObj.setDate(startOfMonth.value.getDate() + i);

    // If day is a weekend, skip it
    if (startOfMonthDateObj.getDay() === 0 || startOfMonthDateObj.getDay() === 6) {
      continue;
    }

    daysInMonth.value.push({
      date: startOfMonthDateObj.toLocaleDateString('de-DE', {day: 'numeric'}),
      timestamp: startOfMonthDateObj.toString()
    });
  }

 /*
  const userDays = await getQueryDays();

  userDays.forEach(userDay => {
    daysInMonth.value = daysInMonth.value.map(monthDay => {

      // auxiliary object for date comparison
      const monthDayDateObj = new Date(monthDay.timestamp)

      if (monthDayDateObj.getTime() === userDay.date.getTime()) {
        monthDay.docId = userDay.id;
        monthDay.users = userDay.users;
        monthDay.mandatory = userDay.isMandatory;
      }
      return monthDay;
    });
  });
  */

}

watch(() => store.currentYear, getDaysInMonth, {immediate: true});

</script>

<template>
  <div class="month">
    <h4 class="month__name">{{ startOfMonthDateObj.toLocaleDateString('de-DE', {month: 'long'}) }}</h4>

    <div class="month__days">
      <h5>Mo</h5>
      <h5>Di</h5>
      <h5>Mi</h5>
      <h5>Do</h5>
      <h5>Fr</h5>
      <div v-if="(startOfMonth.getDay() > 1) && (startOfMonth.getDay() < 6)" v-for="i in startOfMonth.getDay()-1" :key="i"><!-- Fill empty days at the start of a month with empty objects --></div>
      <Day v-for="(day, index) in daysInMonth" :day="day" :dayIndex="index" :key="index"/>
    </div>
  </div>
</template>

<style scoped>
.month__days {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}
</style>
