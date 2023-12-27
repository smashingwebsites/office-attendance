<script setup>

import WeekDay from "@/components/week/day.vue";
import {useDateOfWeek} from "@/composables/useDateOfWeek";
import {db} from '@/firebase'
import {ref, reactive, onMounted} from 'vue'
import {onSnapshot, collection, query, where} from 'firebase/firestore'

const props = defineProps(['date'])

// Firebase references
const usersRef = collection(db, 'users')
const daysRef = collection(db, 'days')
const mandatoryDaysRef = collection(db, 'mandatory-days')

const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];


const startOfWeek = useDateOfWeek(props.date, 1)
const endOfWeek = useDateOfWeek(props.date, 5)

// Calculate workweek dates
const workweek = ref([])
const date = new Date(startOfWeek);

for (let i = 0; i < 5; i++) {
  date.setDate(startOfWeek.getDate() + i);
  workweek.value.push({id: "day" + i, date: date.toLocaleDateString(), name: weekdays[i], timestamp: date.toString()});
}

// Queries for firebase
const queryUsers = query(daysRef, where('date', '>=', startOfWeek), where('date', '<=', endOfWeek))
const queryMandatoryDays = query(mandatoryDaysRef, where('date', '>=', startOfWeek), where('date', '<=', endOfWeek))

onMounted(async () => {
  // Mandatory Days
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

  // Users
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
})
</script>
<template>
  <div class="week">
    <WeekDay v-for="day in workweek" :day="day"/>
  </div>
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
