<script setup>
import WeekDay from "@/components/week/day.vue";
import {useDateOfWeek} from "@/composables/useDateOfWeek";
import {db} from '@/firebase'
import {ref, computed, watch, provide} from 'vue'
import {getDocs, collection, query, where} from 'firebase/firestore'
import {store} from "@/store";

// Firebase references
const daysRef = collection(db, 'days')
const workweek = ref([])

const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
const startOfWeek = computed(() => useDateOfWeek(store.currentDate, 1))
const endOfWeek = computed(() => useDateOfWeek(store.currentDate, 5))

async function getDaysInWeek() {

  workweek.value = []

  const startOfWeekDateObj = new Date(startOfWeek.value)

  for (let i = 0; i < 5; i++) {

    workweek.value.push({
      id: i,
      date: startOfWeekDateObj.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }),
      name: weekdays[i],
      timestamp: startOfWeekDateObj.toUTCString()
    });

    startOfWeekDateObj.setDate(startOfWeekDateObj.getDate() + 1);
  }

  const userDays = await getQueryDays();

  userDays.forEach(userDay => {
    workweek.value = workweek.value.map(weekDay => {

      // auxiliary object for date comparison
      const weekDayDateObj = new Date(weekDay.timestamp)

      if (weekDayDateObj.getTime() === userDay.date.getTime()) {
        weekDay.docId = userDay.id;
        weekDay.users = userDay.users;
        weekDay.mandatory = userDay.isMandatory;
      }
      return weekDay;
    });
  });
}

async function getQueryDays() {
  const queryRef = query(daysRef, where('date', '>=', startOfWeek.value), where('date', '<=', endOfWeek.value));

  const docSnap = await getDocs(queryRef);

  return docSnap.docs.map((doc) => ({
    id: doc.id,
    date: new Date(doc.data().date.seconds * 1000), // Convert seconds to milliseconds
    users: doc.data().users,
    isMandatory: doc.data().mandatory
  }));
}

function handleUserAdded(dayIndex, docId, userId, userName) {
  if (workweek.value[dayIndex].users) {
    workweek.value[dayIndex].users.push({
      id: userId,
      name: userName
    })
  } else {
    workweek.value[dayIndex].docId = docId;
    workweek.value[dayIndex].users = [{
      id: userId,
      name: userName
    }]
  }
}

function handleUserRemoved(dayIndex, userId) {
  if (workweek.value[dayIndex].users) {
    workweek.value[dayIndex].users.splice(workweek.value[dayIndex].users.indexOf(userId), 1);
  }
}

provide('userAddedHandler', handleUserAdded);
provide('userRemovedHandler', handleUserRemoved);

watch(() => store.currentDate, getDaysInWeek, {immediate: true});
</script>

<template>
  <div class="week">
    <WeekDay v-for="(day, index) in workweek" :day="day" :dayIndex="index" :key="index"/>
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
