<script setup>
import HeaderLogo from "@/components/header/logo.vue";
import HeaderNavigation from '@/components/header/navigation.vue'
</script>
<template>
 <header>
   <div class="container">
       <HeaderLogo/>
       <slot></slot>
       <HeaderNavigation/>
   </div>
 </header>
</template>
<style scoped>
header {
  background-color: #fff3d5;
  margin-bottom: 3rem;
  padding-block: 2rem;
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}
</style>
