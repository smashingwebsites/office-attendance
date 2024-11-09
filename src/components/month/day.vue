<script setup>
import User from '@/components/month/user.vue'
import {computed} from "vue";
import {store} from "@/store";
import {auth} from "@/firebase";

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

const isCurrent = computed( () => new Date(props.day.timestamp).toDateString() === new Date().toDateString());
</script>
<template>
  <div class="day" :class="[{ ['current']: isCurrent}, dayStatusClass]">
    <div class="day__date">
      {{ day.date }}
    </div>
    <checkin-button v-if="userNOTCheckedIn"
                    :docId="day.docId"
                    :dayIndex="dayIndex"
                    :dayTimestamp="day.timestamp"
                    :user="auth.currentUser"
                    class="button--month"
                    :class="{ mandatory: day.mandatory }" />
    <checkout-button v-if="userISCheckedIn"
                     :docId="day.docId"
                     :dayIndex="dayIndex"
                     :users="day.users"
                     :userUid="auth.currentUser.uid"
                     class="button--month"
                     :class="{ mandatory: day.mandatory }" />

    <User :user="user" v-if="day.users" v-for="user in day.users"/>
  </div>
</template>
<style scoped>
.day {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .25rem;
  width: 100%;
  padding: .5rem;

  border: 1px solid var(--_clr-state, var(--clr-grey));
  background-color: var(--_clr-state, var(--clr-light-grey));
  background-image: var(--_clr-state-gradient);
  border-radius: var(--border-radius-lg);
  color: var(--clr-text);
}

.day.current {
  border-color: var(--clr-current);
  scale: 1.06;
  box-shadow:
      0px 0px 2.2px rgba(0, 0, 0, 0.02),
      0px 0px 5.3px rgba(0, 0, 0, 0.028),
      0px 0px 10px rgba(0, 0, 0, 0.035),
      0px 0px 17.9px rgba(0, 0, 0, 0.042),
      0px 0px 33.4px rgba(0, 0, 0, 0.05),
      0px 0px 80px rgba(0, 0, 0, 0.07)
;
}
@media (prefers-color-scheme: dark) {
  .day.current {
    box-shadow:
        0px 0px 2.2px rgba(255, 255, 255, 0.02),
        0px 0px 5.3px rgba(255, 255, 255, 0.028),
        0px 0px 10px rgba(255, 255, 255, 0.035),
        0px 0px 17.9px rgba(255, 255, 255, 0.042),
        0px 0px 33.4px rgba(255, 255, 255, 0.05),
        0px 0px 80px rgba(255, 255, 255, 0.07)
  ;
  }
}

.day__date {
  font-weight: 700;
  padding: .25rem;
  font-size: 1.1rem;
  margin-right: auto;
}
</style>
