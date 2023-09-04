<script setup>
// Logo


</script>
<template>
  <nav>
    <ul>
      <li>Monat</li>
      <li>Woche</li>
      <li>Stats</li>
      <li>Profil</li>
      <li>Logout</li>
    </ul>
  </nav>
</template>
<style scoped>
nav ul {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 1rem;

  li {
    border: 2px solid darkgreen;
    padding: .5rem;
    border-radius: .5rem;
  }
}
</style>
