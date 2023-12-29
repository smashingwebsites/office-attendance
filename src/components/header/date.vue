<script setup>
import {useDateOfWeek} from "@/composables/useDateOfWeek";
import {watch, ref, computed, onUpdated} from 'vue'
import {store} from "@/store";

const startOfWeek = computed(() => useDateOfWeek(store.currentDate, 1).toLocaleDateString())
const endOfWeek = computed(() => useDateOfWeek(store.currentDate, 5).toDateString())

</script>
<template>
  <div class="nav">
    <div class="nav__arrow nav__arrow--prev" @click="store.prevWeek()">&larr;</div>
    <div class="nav__date">{{ startOfWeek }} - {{ endOfWeek }}</div>
    <div class="nav__arrow nav__arrow--next" @click="store.nextWeek()">&rarr;</div>
  </div>
</template>

<style scoped>
.nav {
  --_block-padding: .5rem;
  --_inline-padding: .75rem;
  display: flex;
  gap: .2rem;
  line-height: 1;
}

.nav__date {
  font-size: 1.2rem;
  font-weight: 500;
  padding: var(--_block-padding) var(--_inline-padding);
  background-color: var(--clr-light-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
}

.nav .nav__arrow {
  padding: var(--_block-padding) var(--_inline-padding);
  background-color: var(--clr-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--transition-duration) var(--transition-timing);
  cursor: pointer;
}

.nav .nav__arrow:hover {
  background-color: var(--clr-light-grey);
}

.nav .nav__arrow.nav__arrow--prev {
  border-radius: var(--border-radius-lg) var(--border-radius) var(--border-radius) var(--border-radius-lg);
}

.nav .nav__arrow.nav__arrow--next {
  border-radius: var(--border-radius) var(--border-radius-lg) var(--border-radius-lg) var(--border-radius);
}
</style>
