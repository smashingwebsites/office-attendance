<script setup>
import {useDateOfWeek} from "@/composables/useDateOfWeek";
import {inject} from 'vue'

const today = inject('today');

// You can alter the `today` value like this:
//today.value = new Date();

const startOfWeek = useDateOfWeek(today.value, 1)
const endOfWeek = useDateOfWeek(today.value, 5)

function nextWeek() {
  today.value = useDateOfWeek(today.value, 7)
  console.log(today.value)
}
</script>
<template>
  <div class="nav">
    <div class="nav__arrow nav__arrow--prev">&larr;</div>
    <div class="nav__date">{{startOfWeek.toLocaleDateString()}} - {{endOfWeek.toDateString()}}</div>
    <div class="nav__arrow nav__arrow--next" @click="nextWeek">&rarr;</div>
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
