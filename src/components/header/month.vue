<script setup>
import {watch, computed} from 'vue'
import {store} from "@/store";
import {useRoute} from 'vue-router'
import {useAdjacentMonth} from "@/composables/useAdjacentMonth";

const route = useRoute()

const month = computed(() => store.currentDate.toLocaleString('default', {month: 'long'}))
const year = computed(() => store.currentDate.getFullYear())

const nextMonth = computed(() => useAdjacentMonth(store.currentDate, 1))
const prevMonth = computed(() => useAdjacentMonth(store.currentDate, -1))

function setCurrentDateInStore() {
  store.currentDate = new Date(route.params.year, (route.params.month - 1), 1);
}

watch(() => route.params.month, setCurrentDateInStore, {immediate: true});

</script>
<template>
  <div class="nav">
    <router-link :to="{ name: 'month', params: { month: prevMonth.month, year: prevMonth.year }}"
                 class="nav__arrow nav__arrow--prev">&larr;
    </router-link>
    <div class="nav__date nav__date--month">{{ month }} {{ year }}</div>
    <router-link :to="{ name: 'month', params: { month: nextMonth.month, year: nextMonth.year }}"
                 class="nav__arrow nav__arrow--next">&rarr;
    </router-link>
  </div>
</template>
