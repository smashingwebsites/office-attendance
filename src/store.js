import { reactive } from 'vue'
export const store = reactive({
    currentDate: new Date(),
    userIsSignedIn: false,
    currentYear: new Date().getFullYear(),
})
