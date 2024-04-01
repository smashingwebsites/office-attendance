<script setup>
import {computed} from "vue";

const props = defineProps(['user'])

// Get users initials
const initials = computed(() => {
  return props.user.name.first.charAt(0).toUpperCase() + props.user.name.last.charAt(0).toUpperCase()
})

</script>
<template>
  <div class="user">{{ initials }}</div>
</template>
<style scoped>
.user {
  border: 1px solid var(--_clr-state, var(--clr-grey));;
  background-color: var(--clr-light-grey);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--clr-black);
  opacity: .75;
}
</style>
