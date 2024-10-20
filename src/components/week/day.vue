<script setup>
import User from '@/components/week/user.vue'
import {computed} from "vue";
import {auth} from '@/firebase';
import {store} from "@/store";

import CheckinButton from "@/components/checkin-button.vue";
import CheckoutButton from "@/components/checkout-button.vue";

const props = defineProps(['day', 'dayIndex'])

const dayStatusClass = computed(() => {
  if (props.day.mandatory) {
    if (props.day.users) {
      if (props.day.users.length === 0) {
        return 'state--empty'
      } else if (props.day.users.length < 2) {
        return 'state--partially'
      } else {
        return 'state--filled'
      }
    } else {
      return 'state--empty'
    }
  }
})

const userNOTCheckedIn = computed(() => {
  /* User is NOT checked in (or signed in for this day) IF:
   * he is logged into his account
   * no matching uid was found
   * or there are no users checked in this day to begin with */
  if (!store.userIsSignedIn)
    return false

  if (props.day.users) {
    return !props.day.users.some(user => user.id === auth.currentUser.uid);
  }
  return true;
})
const userISCheckedIn = computed(() => {
  if (!store.userIsSignedIn)
    return false

  if (props.day.users) {
    return props.day.users.some(user => user.id === auth.currentUser.uid);
  }
  return false;
})

// todo: not working correctly
const isCurrent = computed(() => {
  const today = new Date().toISOString().split('T')[0];
  return props.day.date === today;
})

</script>
<template>
  <div class="day" :class="[{ ['current']: isCurrent}, dayStatusClass]">
    <div class="day__date">
      {{ day.date }} - {{ day.name }}
    </div>
    <div v-if="day.users" v-for="user in day.users">
      <User :user="user"/>
    </div>
    <checkin-button v-if="userNOTCheckedIn"
                    :docId="day.docId"
                    :dayIndex="dayIndex"
                    :dayTimestamp="day.timestamp"
                    :user="auth.currentUser"
                    class="button--week"/>
    <checkout-button v-if="userISCheckedIn"
                     :docId="day.docId"
                     :dayIndex="dayIndex"
                     :users="day.users"
                     :userUid="auth.currentUser.uid"
                     class="button--week"/>
  </div>
</template>
<style scoped>
.day {
  display: flex;
  flex-direction: column;
  gap: .25rem;
  width: 100%;
}

.day.current {
  border-color: var(--clr-dark);
}

.day__date {
  font-weight: 500;
  border: 1px solid var(--_clr-state, var(--clr-grey));
  background-color: var(--_clr-state, var(--clr-light-grey));
  background-image: var(--_clr-state-gradient);
  padding: .25rem;
  text-align: center;
  border-radius: var(--border-radius-lg);
  font-size: 1.1rem;
  color: var(--clr-text);
  position: relative;
}

/* if day has users */
.day__date:has(+ div) {
  border-radius: var(--border-radius-lg) var(--border-radius-lg) var(--border-radius) var(--border-radius);
}
</style>
