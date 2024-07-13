<script setup>
import Header from '@/components/header/wrapper.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {store} from "@/store";
// https://github.com/commenthol/date-holidays

const auth = getAuth();

// Store if the user is signed in or not
// More user data can be called with auth.currentUser.
onAuthStateChanged(auth, (user) => {
  store.userIsSignedIn = !!user;
});

</script>

<template>
  <Header>
    <router-view name="dateNavigation"/>
  </Header>
  <main>
    <div class="container">
      <router-view/>
    </div>
  </main>
</template>
