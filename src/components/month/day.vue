<script setup>
import User from '@/components/month/user.vue'
import { computed } from "vue";

const props = defineProps(['day'])

const dateObject = new Date(props.day.timestamp);

const formattedDate = dateObject.toLocaleDateString('de-DE',  { day: '2-digit', month: '2-digit' });
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
      {{ formattedDate }}
    </div>
    <div v-if="day.users" v-for="user in day.users">
      <User :user="user" />
    </div>
  </div>
</template>
<style scoped>
.day {
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
  color: var(--_clr-font, var(--clr-black));
}

.day__date {
  font-weight: 700;
  padding: .25rem;
  font-size: 1.1rem;
  margin-right: auto;
}
</style>
