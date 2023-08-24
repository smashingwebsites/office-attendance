<script setup>
defineProps(['user'])

</script>
<template>
      <div class="user">{{ user.name.first }} {{ user.name.last }}</div>
</template>
<style scoped>
.user {
  border: 2px solid darkgreen;
  background: limegreen;
}
</style>
