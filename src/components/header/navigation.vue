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
  box-shadow:
  0px 1.4px 2.2px rgba(0, 0, 0, 0.02),
  0px 3.3px 5.3px rgba(0, 0, 0, 0.028),
  0px 6.3px 10px rgba(0, 0, 0, 0.035),
  0px 11.2px 17.9px rgba(0, 0, 0, 0.042),
  0px 20.9px 33.4px rgba(0, 0, 0, 0.05),
  0px 50px 80px rgba(0, 0, 0, 0.07)
;
}
</style>
