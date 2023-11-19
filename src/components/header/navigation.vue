<script setup>
// Logo


</script>
<template>
  <nav>
    <ul>
      <li>Monat</li>
      <li class="active">Woche</li>
      <li>Stats</li>
      <li>Profil</li>
      <li>Logout</li>
    </ul>
  </nav>
</template>
<style scoped >
nav {
  font-size: 1.2rem;
}

nav ul {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: .5rem;
}

nav ul li {
  padding: .5rem 1rem;
  border-radius: var(--border-radius);
  background: transparent;
  transition: all .2s ease-in-out;
}

nav ul li:hover, nav ul li:focus {
  background: var(--clr-grey);
}

nav ul li.active {
  background: var(--clr-hightlight);
}
</style>
