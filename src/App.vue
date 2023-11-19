<script setup>
import {db} from '@/firebase'
import {ref} from 'vue'
import {onSnapshot, collection, query, where} from 'firebase/firestore'
import WeekDay from '@/components/week/day.vue'
import HeaderWrapper from '@/components/header/wrapper.vue'
import HeaderWeek from '@/components/header/week.vue'

// https://github.com/commenthol/date-holidays

const usersRef = collection(db, 'users')
const daysRef = collection(db, 'days')

const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

const weekEntries = ref([])


// Todo: If not route parameter - use current day as start
const today = new Date("2023-06-06T00:00:00.000Z");
//const today = new Date();

const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 1
);

const endOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 5);

// Calculate workweek dates
const workweek = ref([])

for (let i = 0; i < 5; i++) {
  const date = new Date(startOfWeek);
  date.setDate(startOfWeek.getDate() + i);
  workweek.value.push({id: "day" + i, date: date.toLocaleDateString(), name: weekdays[i]});
}

// Query for firebase
const q = query(daysRef, where('date', '>=', startOfWeek), where('date', '<=', endOfWeek))

// Listen for changes
onSnapshot(q, (querySnapshot) => {
  querySnapshot.forEach((doc) => {

    const entry = doc.data();

    // Convert date to JS date object and format it
    const date = new Date(entry.date.seconds * 1000); // Convert seconds to milliseconds

    // Reformat date
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    entry.date = `${day}/${month}/${year}`; // Format date as dd/mm/yyyy


    // Add entry to matching workweek day
    workweek.value.map((day) => {

      if (day.date === entry.date) {
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
    <HeaderWeek/>
  </HeaderWrapper>
  <main>
    <div class="container">
      <div class="week">
        <WeekDay v-for="day in workweek" :day="day"/>
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
