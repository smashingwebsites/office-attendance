<script setup>
import {computed} from "vue";

const props = defineProps(['user'])

console.log(props.user)

const userInitials = computed(() => {
  if (props.user.name.length > 0) {
    return props.user.name.split(' ').map(word => word.charAt(0)).join('');
  }
  return '-'
})

</script>
<template>
  <div class="user">
    <span class="user__initials">{{ userInitials }}</span>
    <div class="user__fullname">{{ user.name }}</div>
  </div>
</template>
<style scoped>
.user {
  color: var(--clr-black);
  position: relative;
  cursor: default;

  /* Centers the Fullname "Tooltip" */
  display: flex;
  justify-content: center;
}

.user .user__initials {
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: opacity var(--transition-duration) var(--transition-timing);
  border: 1px solid var(--_clr-state, var(--clr-grey));;
  background-color: var(--clr-light-grey);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  opacity: .75;
}

.user .user__fullname {
  position: absolute;
  bottom: 70%;
  background-color: var(--clr-hightlight);
  opacity: 0;
  width: max-content;
  padding: .25rem .5rem;
  border-radius: var(--border-radius);
  transition: opacity var(--transition-duration) var(--transition-timing) .1s;
  box-shadow: 0 0 5px rgba(0, 0, 0, .25);
  z-index: 1;
}

.user:hover .user__initials {
  opacity: .25;
}
.user:hover .user__fullname {
  opacity: 1;
  transition-delay: 0s;
}
</style>
