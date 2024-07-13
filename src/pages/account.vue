<template>
  <div>
    <h1>User Profile {{auth.currentUser.displayName}}</h1>
  </div>
</template>

<script setup>

import { auth } from  '@/firebase';


</script>

<style scoped>
</style>
