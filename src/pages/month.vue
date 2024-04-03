<script setup>
import {db} from '@/firebase'
import {ref, computed, watch} from 'vue'
import {getDocs, collection, query, where} from 'firebase/firestore'
import {store} from "@/store";
import Day from "@/components/month/day.vue";

const daysRef = collection(db, 'days')
const daysInMonth = ref([])

const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

const startOfMonth = computed(() => new Date(store.currentDate.getFullYear(), store.currentDate.getMonth(), 1))
const endOfMonth = computed(() => new Date(store.currentDate.getFullYear(), store.currentDate.getMonth() + 1, 0))

async function getDaysInMonth() {
  const startOfMonthDateObj = new Date(startOfMonth.value);

  daysInMonth.value = [];
  const endOfMonth = new Date(startOfMonthDateObj.getFullYear(), startOfMonthDateObj.getMonth() + 1, 0);
  const daysInTotal = endOfMonth.getDate();

  for (let i = 0; i < daysInTotal; i++) {
    startOfMonthDateObj.setDate(startOfMonth.value.getDate() + i);

    // If day is a weekend, skip it
    if (startOfMonthDateObj.getDay() === 0 || startOfMonthDateObj.getDay() === 6) {
      continue;
    }
    daysInMonth.value.push({
      id: "day" + i,
      date: startOfMonthDateObj.toLocaleDateString(),
      name: weekdays[startOfMonthDateObj.getDay() - 1],
      timestamp: startOfMonthDateObj.toString()
    });
  }

  const userDays = await getQueryDays();

  userDays.forEach(userDay => {
    daysInMonth.value = daysInMonth.value.map(monthDay => {
      if (monthDay.date === userDay.date) {
        monthDay.users = userDay.users;
        monthDay.mandatory = userDay.isMandatory;
      }
      return monthDay;
    });
  });
}

async function getQueryDays() {
  const queryRef = query(daysRef, where('date', '>=', startOfMonth.value), where('date', '<=', endOfMonth.value));

  const docSnap = await getDocs(queryRef);

  return docSnap.docs.map((doc) => ({
    date: new Date(doc.data().date.seconds * 1000).toLocaleDateString(), // Convert seconds to milliseconds
    users: doc.data().users,
    isMandatory: doc.data().mandatory
  }));
}

watch(() => store.currentDate, getDaysInMonth, {immediate: true});

</script>
<template>
  <div class="month-header">
    <div class="day-label" v-for="dayLabel in weekdays">{{ dayLabel }}</div>
  </div>
  <div class="month">
    <div v-for="i in startOfMonth.getDay()-1" :key="i"><!-- Fill empty days at the start of a month with empty objects --></div>
    <Day v-for="day in daysInMonth" :day="day" :key="day.id"/>
  </div>
</template>

<style scoped>
.month, .month-header {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.month-header {
  margin-bottom: 1.5rem;
}

.day-label {
  font-weight: 700;
  text-align: center;
  padding: .5rem;
  letter-spacing: .05em;
  text-transform: uppercase;

  background-color: var(--clr-light-grey);
  background-image: var(--_clr-state-gradient);
  border-radius: var(--border-radius-lg);
  color: #777;
}
</style>
