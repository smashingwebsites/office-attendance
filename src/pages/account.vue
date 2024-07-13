<script setup>

import { auth } from  '@/firebase';


</script>
<template>
  <div>
    <h1>User Profile of {{auth.currentUser.displayName}}</h1>
  </div>
</template>

<style scoped>
</style>
