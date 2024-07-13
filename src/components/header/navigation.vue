<script setup>
import {useWeekNumber} from "@/composables/useWeekNumber";
import {useRouter} from 'vue-router';
import { auth } from  '@/firebase';

const router = useRouter();

const currentYear = new Date().getFullYear();
const currentWeek = useWeekNumber(new Date());
const currentMonth = new Date().getMonth() + 1;
const isActive = (type) => {
  return router.currentRoute.value.meta.type === type;
};
</script>
<template>
  <nav>
    <ul>
      <li>
        <router-link
            :to="{ name: 'month', params: { month: currentMonth, year: currentYear }}"
            :class="{ active: isActive('month') }">
          Monat
        </router-link>
      </li>
      <li>
        <router-link
            :to="{ name: 'week', params: { week: currentWeek, year: currentYear }}"
            :class="{ active: isActive('week') }">
          Woche
        </router-link>
      </li>
      <li>
        <router-link to="/stats">
          Stats
        </router-link>
      </li>
      <li>
        <router-link to="/account">Account</router-link>
      </li>
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

nav ul li a.active, nav ul li a.router-link-active {
  background: var(--clr-hightlight);
}
</style>
