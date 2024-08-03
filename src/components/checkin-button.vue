<script setup>
import {collection, doc, setDoc, updateDoc, arrayUnion, Timestamp} from "firebase/firestore";
import {inject} from "vue";
import {db} from "@/firebase";

const props = defineProps(['day', 'user'])

const userAddedHandler = inject('userAddedHandler');

const checkIn = async () => {
  userAddedHandler(props.day.id, props.user.uid, props.user.displayName);

  if (props.day.docId) {
    await updateDoc(doc(db, "days", props.day.docId), {
      users: arrayUnion(
          {
            id: props.user.uid,
            name: props.user.displayName
          }
      )
    });
  } else {
    await setDoc(doc(collection(db, 'days')), {
      date: Timestamp.fromDate(new Date(props.day.timestamp)),
      users: [{
        id: props.user.uid,
        name: props.user.displayName
      }]
    });
  }
}
</script>
<template>
  <button @click="checkIn" class="button">
    &plus;
  </button>
</template>

<style scoped>
.button {
  margin-top: .5rem;
  background-color: var(--clr-light-green);
  border: 2px solid var(--clr-green);
  border-radius: var(--border-radius);
  font-size: 2rem;
  line-height: 1;
  color: white;
}

.button:hover {
  background-color: var(--clr-green);
}
</style>
