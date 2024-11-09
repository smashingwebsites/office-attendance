<script setup>
import Month from "@/components/day-settings/month.vue";
</script>

<template>
  <div class="day-settings">
    <Month v-for="(month, monthIndex) in 12" :month="monthIndex" />
  </div>
</template>

<style scoped>
.day-settings {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
}
</style>
