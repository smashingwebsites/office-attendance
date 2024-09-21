<script setup>
import {collection, doc, setDoc, updateDoc, arrayUnion, Timestamp, deleteField} from "firebase/firestore";
import {inject} from "vue";
import {db} from "@/firebase";

const props = defineProps(['docId', 'dayIndex', 'users', 'userUid'])

const userRemovedHandler = inject('userRemovedHandler');

const checkOut = async () => {
  userRemovedHandler(props.dayIndex, props.userUid);

  const tempUsers = [...props.users];
  const indexOfUserToDelete = tempUsers.findIndex(user => user.id === props.userUid);

  await updateDoc(doc(db, "days", props.docId), {
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
  --_btn-light-clr: var(--clr-light-red);
  --_btn-dark-clr: var(--clr-red);

  border-width: 2px;
  line-height: 1;
  color: white;
  font-weight: bold;
}
</style>
