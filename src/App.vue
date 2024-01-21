<script setup>
import Week from '@/components/week/week.vue'
import HeaderWrapper from '@/components/header/wrapper.vue'
import HeaderWeek from '@/components/header/date.vue'
// https://github.com/commenthol/date-holidays
</script>

<template>
  <HeaderWrapper>
    <HeaderWeek/>
  </HeaderWrapper>
  <main>
    <div class="container">
      <Week />
    </div>
  </main>
</template>
