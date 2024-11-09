<script setup>


const props = defineProps(['day', 'dayIndex'])


</script>
<template>
  <div class="day">
    {{ day.date }}
  </div>
</template>
<style scoped>
.day {
  --_size: 2rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;

  width: var(--_size);
  height: var(--_size);
  border: 2px solid var(--_clr-state, var(--clr-light-grey));
  border-radius: var(--_size);
}

</style>
