<script setup>
import {useWeekNumber} from "@/composables/useWeekNumber";
import {useRouter} from 'vue-router';
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "@/firebase";
import { signOut } from 'firebase/auth'

import {store} from "@/store";

const provider = new GoogleAuthProvider();

const signUserIn = async () => {
  signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}
const signUserOut = async () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    console.log(error)
  });
}

const router = useRouter();

const currentYear = new Date().getFullYear();
const currentWeek = useWeekNumber(new Date());
const currentMonth = new Date().getMonth() + 1;
const isActive = (type) => {
  return router.currentRoute.value.meta.type === type;
};
</script>
<template>
  <nav>
    <ul>
      <li>
        <router-link
            :to="{ name: 'month', params: { month: currentMonth, year: currentYear }}"
            :class="{ active: isActive('month') }" class="nav-link">
          Monat
        </router-link>
      </li>
      <li>
        <router-link
            :to="{ name: 'week', params: { week: currentWeek, year: currentYear }}"
            :class="{ active: isActive('week') }" class="nav-link">
          Woche
        </router-link>
      </li>
      <!-- Coming Soon
      <li>
        <router-link to="/stats" class="nav-link">
          Stats
        </router-link>
      </li>
      <li>
        <router-link to="/account" class="nav-link">Account</router-link>
      </li>-->
      <li v-if="store.userIsSignedIn"><a class="nav-link" type="button" @click.prevent="signUserOut">Logout</a></li>
      <li v-if="!store.userIsSignedIn"><a class="nav-link" type="button" @click.prevent="signUserIn">Login</a></li>
    </ul>
  </nav>
</template>
<style scoped>
nav {
  font-size: 1rem;
}

nav ul {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: .5rem;
}

nav ul li .nav-link {
  padding: .5rem 1rem;
  border-radius: var(--border-radius);
  background: transparent;
  transition: all .2s ease-in-out;
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

nav ul li .nav-link:hover, nav ul li .nav-link:focus {
  background: var(--clr-grey);
}

nav ul li .nav-link.active, nav ul li .nav-link.router-link-active {
  background: var(--clr-hightlight);
}
</style>
