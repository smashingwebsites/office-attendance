<script setup>
import {collection, doc, addDoc, updateDoc, arrayUnion, Timestamp} from "firebase/firestore";
import {inject} from "vue";
import {db} from "@/firebase";

const props = defineProps(['docId', 'user', 'dayIndex', 'dayTimestamp'])

const userAddedHandler = inject('userAddedHandler');

const checkIn = async () => {

  if (props.docId) {
    await updateDoc(doc(db, "days", props.docId), {
      users: arrayUnion(
          {
            id: props.user.uid,
            name: props.user.displayName
          }
      )
    });
    userAddedHandler(props.dayIndex, props.docId, props.user.uid, props.user.displayName);

  } else {
    const docRef = await addDoc(collection(db, 'days'), {
      date: Timestamp.fromDate(new Date(props.dayTimestamp)),
      users: [{
        id: props.user.uid,
        name: props.user.displayName
      }]
    });
    userAddedHandler(props.dayIndex, docRef.id, props.user.uid, props.user.displayName);
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
  --_btn-light-clr: var(--clr-light-green);
  --_btn-dark-clr: var(--clr-green);

  border-width: 2px;
  line-height: 1;
  color: white;
  z-index: 1;
}

</style>
