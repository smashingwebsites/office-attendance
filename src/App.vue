<script setup>

import Header from '@/components/header/wrapper.vue'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const additionalHeaderComponent = computed(() => {
  if (route.meta.additionalHeaderComponent) {
    return route.meta.additionalHeaderComponent
  }
  return null
})

// https://github.com/commenthol/date-holidays
</script>

<template>
  <Header>
    <component :is="additionalHeaderComponent" />
  </Header>
  <main>
    <div class="container">
      <router-view/>
    </div>
  </main>
</template>
