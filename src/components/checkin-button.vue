<script setup>
import {collection, doc, setDoc, updateDoc, arrayUnion, Timestamp} from "firebase/firestore";
import { inject } from "vue";
import {db} from "@/firebase";
const props = defineProps(['day', 'user'])

const userAddedHandler = inject('userAddedHandler');

const checkIn = async () => {
  userAddedHandler(props.day.id, props.user);
  if (props.day.docId) {
    await updateDoc(doc(db, "days", props.day.docId), {
      users: arrayUnion(
          {
            name: {
              first: "alexander",
              last: "2te2stLast"
            }
          }
      )
    });
  } else {
    await setDoc(doc(collection(db, 'days')), {
      date: Timestamp.fromDate(new Date(props.day.timestamp)),
      users: [{
        name: {
          first: "testFirst",
          last: "testLast"
        }
      }]
    });
  }
}
</script>
<template>
  <button @click="checkIn" class="button">
    {{ day.docId }}
  </button>
</template>

<style scoped>
</style>
