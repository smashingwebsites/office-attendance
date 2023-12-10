<script setup async>
import { db } from '@/firebase'
import { ref } from 'vue'
import { onSnapshot, collection, query, where, getDocs } from 'firebase/firestore'
import WeekDay from '@/components/week/day.vue'
import HeaderWrapper from '@/components/header/wrapper.vue'
import HeaderWeek from '@/components/header/week.vue'

// https://github.com/commenthol/date-holidays

const usersRef = collection(db, 'users')
const daysRef = collection(db, 'days')
const mandatoryDaysRef = collection(db, 'mandatory-days')

const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];


// Todo: If not route parameter - use current day as start
const today = new Date("2023-06-06T00:00:00.000Z");
//const today = new Date();

const startOfWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - today.getDay() + 1,
);

const endOfWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - today.getDay() + 5);

// Calculate workweek dates
const workweek = ref([])
const date = new Date(startOfWeek);

for (let i = 0; i < 5; i++) {
  date.setDate(startOfWeek.getDate() + i);
  workweek.value.push({ id: "day" + i, date: date.toLocaleDateString(), name: weekdays[i], timestamp: date.toString() });
}

// Query days from firebase
const queryUsers = query(daysRef, where('date', '>=', startOfWeek), where('date', '<=', endOfWeek))

const queryMandatoryDays = query(mandatoryDaysRef, where('date', '>=', startOfWeek), where('date', '<=', endOfWeek))

onSnapshot(queryMandatoryDays, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const dateEntry = new Date(doc.data().date.seconds * 1000); // Convert seconds to milliseconds

    // Add entry to matching workweek day
    workweek.value.map((day) => {

      const dayDateObj = new Date(day.timestamp);

      if (dayDateObj.toDateString() === dateEntry.toDateString()) {
        day.mandatory = true;
      }

      return {
        ...day,
      }
    });
  });
})


// Listen for changes
onSnapshot(queryUsers, (querySnapshot) => {
  querySnapshot.forEach((doc) => {

    const entry = doc.data();
    const entryDate = new Date(entry.date.seconds * 1000); // Convert seconds to milliseconds

    // Add entry to matching workweek day
    workweek.value.map((day) => {

      if (day.date === entryDate.toLocaleDateString()) {
        day.users = entry.users
      }

      return {
        ...day,
      }
    });
  })
})
</script>

<template>
  <HeaderWrapper>
    <HeaderWeek />
  </HeaderWrapper>
  <main>
    <div class="container">
      <div class="week">
        <WeekDay v-for="day in workweek" :day="day" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.week {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1rem;
  align-items: flex-start;
  justify-content: space-between;
}
</style>
