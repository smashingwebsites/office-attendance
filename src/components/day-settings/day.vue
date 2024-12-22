<script setup>
import {computed} from "vue";

const props = defineProps(['day'])

const dayStatusClass = computed(() => {
  if (props.day.mandatory) {
      return 'state--empty'
  }
  return null
})
</script>
<template>
  <div class="day" :class="dayStatusClass">
    {{ day.date }}
  </div>
</template>
<style scoped>
.day {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  cursor: pointer;

  width: var(--_size);
  height: var(--_size);
  border: 2px solid var(--_clr-state, var(--clr-grey));
  border-radius: var(--_size);

  place-self: center;
}

</style>
