import { reactive } from 'vue'
// todo replace store with routing
export const store = reactive({
    currentDate: new Date("2023-06-07T00:00:00.000Z"),
    nextWeek() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - this.currentDate.getDay() + 8)
    },
    prevWeek() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - this.currentDate.getDay() - 6)
    }
})
