<script setup>
import User from '@/components/week/user.vue'
import { computed } from "vue";

const props = defineProps(['day'])

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
    }
    else {
      return 'state--empty'
    }
  }
})
</script>
<template>
  <div class="day" :class="dayStatusClass">
    <div class="day__date">
      {{ day.date }}
    </div>
    <div v-if="day.users" v-for="user in day.users">
      <User :user="user" />
    </div>
  </div>
</template>
<style scoped>
.day {
  display: flex;
  flex-direction: column;
  gap: .25rem;
  width: 100%;
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
  color: var(--_clr-font, var(--clr-black));
  position: relative;
}

/* if day has users */
.day__date:has(+ div) {
  border-radius: var(--border-radius-lg) var(--border-radius-lg) var(--border-radius) var(--border-radius);
}
</style>
