<script setup>
defineProps(['user'])

</script>
<template>
  <div class="user">{{ user.name.first }} {{ user.name.last }} {{ user.name }} </div>
</template>
<style scoped>
.user {
  border: 1px solid var(--clr-grey);
  background-color: var(--clr-light-grey);
  padding: .25rem 0;
  text-align: center;
  border-radius: var(--border-radius);
  font-size: 1rem;

}

.user:last-child {
  border-radius: var(--border-radius) var(--border-radius) var(--border-radius-lg) var(--border-radius-lg);
}
</style>
