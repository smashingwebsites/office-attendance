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

.day.state--empty {
  --_clr-font: var(--clr-white);
  --_clr-state: var(--clr-red);
  --_clr-state-gradient: linear-gradient(150deg,
      hsl(0deg 100% 65%) 0%,
      hsl(0deg 100% 64%) 11%,
      hsl(0deg 100% 64%) 22%,
      hsl(0deg 100% 63%) 33%,
      hsl(0deg 100% 63%) 44%,
      hsl(0deg 100% 62%) 56%,
      hsl(0deg 100% 61%) 67%,
      hsl(0deg 100% 61%) 78%,
      hsl(0deg 100% 60%) 89%,
      hsl(0deg 100% 59%) 100%);
}

.day.state--partially {
  --_clr-font: var(--clr-white);
  --_clr-state: var(--clr-orange);
  --_clr-state-gradient: linear-gradient(150deg,
      hsl(33deg 100% 54%) 0%,
      hsl(33deg 98% 53%) 11%,
      hsl(33deg 96% 52%) 22%,
      hsl(33deg 94% 51%) 33%,
      hsl(33deg 92% 50%) 44%,
      hsl(33deg 94% 49%) 56%,
      hsl(33deg 95% 48%) 67%,
      hsl(33deg 97% 47%) 78%,
      hsl(33deg 98% 47%) 89%,
      hsl(33deg 100% 46%) 100%);
}

.day.state--filled {
  --_clr-font: var(--clr-white);
  --_clr-state: var(--clr-green);
  --_clr-state-gradient: linear-gradient(150deg,
      hsl(153deg 47% 49%) 0%,
      hsl(153deg 48% 48%) 11%,
      hsl(153deg 48% 48%) 22%,
      hsl(153deg 48% 47%) 33%,
      hsl(153deg 48% 46%) 44%,
      hsl(153deg 48% 45%) 56%,
      hsl(153deg 49% 45%) 67%,
      hsl(153deg 49% 44%) 78%,
      hsl(153deg 49% 43%) 89%,
      hsl(153deg 49% 43%) 100%);
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
