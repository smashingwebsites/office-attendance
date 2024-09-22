<script setup>
import {db} from '@/firebase'
import {ref, computed, watch, provide} from 'vue'
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
      date: startOfMonthDateObj.toLocaleDateString(),
      name: weekdays[startOfMonthDateObj.getDay() - 1],
      timestamp: startOfMonthDateObj.toString()
    });
  }

  const userDays = await getQueryDays();

  userDays.forEach(userDay => {
    daysInMonth.value = daysInMonth.value.map(monthDay => {
      if (monthDay.date === userDay.date) {
        monthDay.docId = userDay.id;
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
    id: doc.id,
    date: new Date(doc.data().date.seconds * 1000).toLocaleDateString(), // Convert seconds to milliseconds
    users: doc.data().users,
    isMandatory: doc.data().mandatory
  }));
}

watch(() => store.currentDate, getDaysInMonth, {immediate: true});

function handleUserAdded(dayIndex, docId, userId, userName) {
  if (daysInMonth.value[dayIndex].users) {
    daysInMonth.value[dayIndex].users.push({
      id: userId,
      name: userName
    })
  } else {
    daysInMonth.value[dayIndex].docId = docId;
    daysInMonth.value[dayIndex].users = [{
      id: userId,
      name: userName
    }]
  }
}

function handleUserRemoved(dayIndex, userId) {
  if (daysInMonth.value[dayIndex].users) {
    daysInMonth.value[dayIndex].users.splice(daysInMonth.value[dayIndex].users.indexOf(userId), 1);
  }
}

provide('userAddedHandler', handleUserAdded);
provide('userRemovedHandler', handleUserRemoved);

</script>
<template>
  <div class="month-header">
    <div class="day-label" v-for="dayLabel in weekdays">{{ dayLabel }}</div>
  </div>
  <div class="month">
    <div v-if="(startOfMonth.getDay() > 1) && (startOfMonth.getDay() < 6)" v-for="i in startOfMonth.getDay()-1" :key="i"><!-- Fill empty days at the start of a month with empty objects --></div>
    <Day v-for="(day, index) in daysInMonth" :day="day" :dayIndex="index" :key="index"/>
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
  font-weight: 500;
  text-align: center;
  padding: .5rem;
  letter-spacing: .05em;
  text-transform: uppercase;

  /*border: 2px solid var(--clr-grey);
  background-color: var(--clr-light-grey);
  background-image: var(--_clr-state-gradient);*/
  border-radius: var(--border-radius-lg);
  color: var(--clr-black);
}
</style>
