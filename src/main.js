import './assets/main.css'

import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from '@/App.vue'
import week from '@/pages/week.vue'
import month from '@/pages/month.vue'
import account from '@/pages/account.vue'
import stats from '@/pages/stats.vue'
import HeaderWeek from '@/components/header/date.vue'
import HeaderMonth from '@/components/header/date.vue'


const routes = [
    {
        path: '/',
        components: {
            default: week,
            dateNavigation: HeaderWeek
        },
    },
    {
        path: '/week/:year/:nr',
        component: week,
        name: 'week',
        components: {
            default: week,
            dateNavigation: HeaderWeek
        },
    },
    {
        path: '/month/:year/:nr',
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
