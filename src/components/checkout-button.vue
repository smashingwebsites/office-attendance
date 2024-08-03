<script setup>
import {collection, doc, setDoc, updateDoc, arrayUnion, Timestamp, deleteField} from "firebase/firestore";
import {inject} from "vue";
import {db} from "@/firebase";

const props = defineProps(['day', 'user'])

const userRemovedHandler = inject('userRemovedHandler');

const checkOut = async () => {
  userRemovedHandler(props.day.id, props.user.uid);

  const tempUsers = [...props.day.users];
  const indexOfUserToDelete = tempUsers.findIndex(user => user.id === props.user.uid);

  await updateDoc(doc(db, "days", props.day.docId), {
    users: tempUsers.splice(indexOfUserToDelete, 1),
  });

}
</script>
<template>
  <button @click="checkOut" class="button">
    &minus;
  </button>
</template>

<style scoped>
.button {
  margin-top: .5rem;
  background-color: var(--clr-light-red);
  border: 2px solid var(--clr-red);
  border-radius: var(--border-radius);
  font-size: 2rem;
  line-height: 1;
  color: white;
}

.button:hover {
  background-color: var(--clr-red);
}
</style>
