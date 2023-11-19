<script setup>
import User from '@/components/week/user.vue'

defineProps(['day'])
</script>
<template>
  <div class="day">
    <div class="day__date">
      {{ day.date }}
    </div>
    <div v-if="day.users" v-for="user in day.users">
      <User :user="user"/>
    </div>
  </div>
</template>
<style scoped>
.day {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  width: 100%;
  font-size: 1.2rem;
}

.day.state--empty {
  --clr-state: var(--clr-red);
}

.day.state--partially {
  --clr-state: var(--clr-orange);
}

.day.state--filled {
  --clr-state: var(--clr-green);
}

.day__date {
  font-weight: bold;
  border: 2px solid var(--clr-grey);
  padding: .5rem;
  text-align: center;
  border-radius: var(--border-radius);

}
</style>
