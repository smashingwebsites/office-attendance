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

  .day__date {
    font-weight: bold;
    border: 2px solid limegreen;
  }
}
</style>
