<script setup>
import {computed, ref, watch} from "vue";
import {store} from "@/store";
import Day from "@/components/day-settings/day.vue";
import {collection, deleteDoc, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "@/firebase";
import {useSetMandatoryDayState} from "@/composables/useSetMandatoryDayState";

const props = defineProps(['month'])

const daysRef = collection(db, 'days')
const daysInMonth = ref([])

const startOfMonth = computed(() => new Date(Date.UTC(store.currentYear, props.month, 1)))
const endOfMonth = computed(() => new Date(Date.UTC(store.currentYear, props.month + 1, 0)))

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

  const userDays = await getQueryDays();

  userDays.forEach(userDay => {
    daysInMonth.value = daysInMonth.value.map(monthDay => {

      // auxiliary object for date comparison
      const monthDayDateObj = new Date(monthDay.timestamp)

      if (monthDayDateObj.getTime() === userDay.date.getTime()) {
        monthDay.docId = userDay.id;
        monthDay.mandatory = userDay.isMandatory;
        monthDay.userQuantity = userDay.userQuantity;
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
    date: new Date(doc.data().date.seconds * 1000), // Convert seconds to milliseconds
    isMandatory: doc.data().mandatory,
    userQuantity: doc.data().users ? doc.data().users.length : 0,
  }));
}

async function setMandatoryDaysInMonth(dayNumber) {
  /*
  * compare day number you get from firebase
  * go through days in dayArray
  * check if already holiday
  * set days as mandatoy in DB and in view
   */
}

async function toggleMandatoryState(index) {
  let dayDataObject = daysInMonth.value[index]

  if (dayDataObject.docId !== undefined) {
    const daysDocRef = doc(db, 'days', dayDataObject.docId)
    if (dayDataObject.userQuantity > 0) {
      await updateDoc(daysDocRef, {
        mandatory: !dayDataObject.mandatory,
      });
      dayDataObject.mandatory = !dayDataObject.mandatory
    } else {
      await deleteDoc(daysDocRef);
      dayDataObject.docId = undefined;
      dayDataObject.mandatory = false;
    }
  } else {
    dayDataObject.docId = await useSetMandatoryDayState(dayDataObject.timestamp)
    dayDataObject.mandatory = true
  }
}

watch(() => store.currentYear, getDaysInMonth, {immediate: true});

</script>

<template>
  <div>
    <h4 class="month-name">{{ startOfMonthDateObj.toLocaleDateString('de-DE', {month: 'long'}) }}</h4>

    <div class="days">
      <h5 class="day-name">Mo</h5>
      <h5 class="day-name">Di</h5>
      <h5 class="day-name">Mi</h5>
      <h5 class="day-name">Do</h5>
      <h5 class="day-name">Fr</h5>
      <div v-if="(startOfMonth.getDay() > 1) && (startOfMonth.getDay() < 6)" v-for="i in startOfMonth.getDay()-1"
           :key="i"><!-- Fill empty days at the start of a month with empty objects --></div>
      <Day v-for="(day, index) in daysInMonth" :day="day" :key="index"
           @click="toggleMandatoryState(index)"/>
    </div>
  </div>
</template>

<style scoped>
.month-name {
  font-weight: bold;
  margin-bottom: .5rem;
  font-size: 1.2rem;
}

.days {
  --_size: 2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: .5rem 1rem;
  align-items: center;
  width: var(--_size);
  justify-items: center;
}

.day-name {
  font-weight: bold;
  text-align: center;
}
</style>
