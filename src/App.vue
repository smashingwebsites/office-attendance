<script setup>
import Week from '@/components/week/week.vue'
import HeaderWrapper from '@/components/header/wrapper.vue'
import HeaderWeek from '@/components/header/date.vue'
import {provide, ref} from "vue";

// https://github.com/commenthol/date-holidays

// Todo: If not route parameter - use current day as start
const today = ref(new Date("2023-06-06T00:00:00.000Z"));
provide('today', today);

</script>

<template>
  <HeaderWrapper>
    <HeaderWeek/>
  </HeaderWrapper>
  <main>
    <div class="container">
      <div>today: {{ today }}</div>
      <Week :date=today />
    </div>
  </main>
</template>
