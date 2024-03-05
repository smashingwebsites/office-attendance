<script setup>
import {computed} from "vue";
import {store} from "@/store";
import {useWeekNumber} from "@/composables/useWeekNumber";

const currentWeek = computed(() => useWeekNumber(store.currentDate))
const currentYear = computed(() => store.currentDate.getFullYear())
const currenMonth = computed(() => store.currentDate.getMonth() + 1)

</script>
<template>
  <nav>
    <ul>
      <li><router-link :to="{ name: 'month', params: { month: currenMonth, year: currentYear }}">Monat</router-link></li>
      <li><router-link :to="{ name: 'week', params: { week: currentWeek, year: currentYear }}">Woche</router-link></li>
      <li><router-link to="/stats">Stats</router-link></li>
      <li><router-link to="/account">Account</router-link></li>
      <li><a href="#">Logout</a></li>
    </ul>
  </nav>
</template>
<style scoped>
nav {
  font-size: 1rem;
}

nav ul {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: .5rem;
}

nav ul li a {
  padding: .5rem 1rem;
  border-radius: var(--border-radius);
  background: transparent;
  transition: all .2s ease-in-out;
  display: block;
  text-decoration: none;
  color: inherit;
}

nav ul li a:hover, nav ul li a:focus {
  background: var(--clr-grey);
}

nav ul li a.router-link-active {
  background: var(--clr-hightlight);
}
</style>
