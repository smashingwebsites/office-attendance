import './assets/main.css'

import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import {useWeekNumber} from "@/composables/useWeekNumber";
import App from '@/App.vue'
import week from '@/pages/week.vue'
import month from '@/pages/month.vue'
import account from '@/pages/account.vue'
import stats from '@/pages/stats.vue'
import HeaderWeek from '@/components/header/week.vue'
import HeaderMonth from '@/components/header/month.vue'

// get the current year and week number for redirecting to the current week
const currentYear = new Date().getFullYear();
const currentWeek = useWeekNumber(new Date());
const currentMonth = new Date().getMonth() + 1;


const routes = [
    {
        path: '/',
        redirect: to => {
            return { name: 'week', params: { week: currentWeek, year: currentYear } }
        },
    },
    {
        path: '/week',
        redirect: to => {
            return { name: 'week', params: { week: currentWeek, year: currentYear } }
        },
    },
    {
        path: '/week/:year/:week',
        component: week,
        name: 'week',
        meta: { type: 'week' },
        components: {
            default: week,
            dateNavigation: HeaderWeek
        },
    },
    {
        path: '/month',
        redirect: to => {
            return { name: 'month', params: { month: currentMonth, year: currentYear } }
        },
    },
    {
        path: '/month/:year/:month',
        component: month,
        name: 'month',
        meta: { type: 'month' },
        components: {
            default: month,
            dateNavigation: HeaderMonth
        },
    },
    {path: '/account', component: account},
    {path: '/stats', component: stats},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app')
