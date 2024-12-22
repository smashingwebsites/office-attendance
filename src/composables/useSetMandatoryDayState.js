import {addDoc, collection, Timestamp} from "firebase/firestore";
import {db} from "@/firebase";

export async function useSetMandatoryDayState(timestamp) {
    const docRef = await addDoc(collection(db, 'days'), {
        date: Timestamp.fromDate(new Date(timestamp)),
        mandatory: true,
    });
    return docRef.id;
}
