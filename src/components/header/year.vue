<script setup>
import { computed} from 'vue'
import {store} from "@/store";

const year = computed(() => store.currentYear)

function setYearInStore(change) {
  store.currentYear = year.value+change;
}
</script>
<template>
  <div class="nav">
    <button @click="setYearInStore(-1)" class="nav__arrow nav__arrow--prev">&larr;</button>
    <div class="nav__date nav__date--month">{{ year }}</div>
    <button @click="setYearInStore(1)" class="nav__arrow nav__arrow--next">&rarr;</button>
  </div>
</template>
