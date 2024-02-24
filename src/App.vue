<script setup>
import Header from '@/components/header/wrapper.vue'

// https://github.com/commenthol/date-holidays
</script>

<template>
  <Header>
    <router-view name="dateNavigation"/>
  </Header>
  <main>
    <div class="container">
      <router-view/>
    </div>
  </main>
</template>
