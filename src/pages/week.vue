<script setup>
import WeekDay from "@/components/week/day.vue";
import {useDateOfWeek} from "@/composables/useDateOfWeek";
import {db} from '@/firebase'
import {ref, onUpdated, onMounted, computed, watch} from 'vue'
import {getDocs, collection, query, where} from 'firebase/firestore'
import {store} from "@/store";
import {useRouter, useRoute} from 'vue-router'

// Firebase references
const daysRef = collection(db, 'days')
const workweek = ref([])

const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
const startOfWeek = computed(() => useDateOfWeek(store.currentDate, 1))
const endOfWeek = computed(() => useDateOfWeek(store.currentDate, 5))

const router = useRouter()
const route = useRoute()

async function getDaysInWeek() {

  workweek.value = []

  const startOfWeekDateObj = new Date(startOfWeek.value)

  for (let i = 0; i < 5; i++) {
    startOfWeekDateObj.setDate(startOfWeek.value.getDate() + i);

    workweek.value.push({
      id: "day" + i,
      date: startOfWeekDateObj.toLocaleDateString(),
      name: weekdays[i],
      timestamp: startOfWeekDateObj.toString()
    });
  }

  const userDays = await getQueryDays();

  userDays.forEach(userDay => {
    workweek.value = workweek.value.map(weekDay => {
      if (weekDay.date === userDay.date) {
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
    date: new Date(doc.data().date.seconds * 1000).toLocaleDateString(), // Convert seconds to milliseconds
    users: doc.data().users,
    isMandatory: doc.data().mandatory
  }));
}

watch(() => store.currentDate, getDaysInWeek, {immediate: true});
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
