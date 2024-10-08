import LockScreen from './../views/LockScreen.vue'

export default [
    {
        name: 'LockScreen',
        path: "/",
        component: LockScreen
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./../views/Login.vue'),
    },
    {
        path: '/phase1',
        name: 'phase1',
        component: () => import('./../views/phases/Phase1.vue'),
    },
    {
        path: '/phase2',
        name: 'phase2',
        component: () => import('./../views/phases/Phase2.vue'),
    },
    {
        path: '/phase3',
        name: 'phase3',
        component: () => import('./../views/phases/Phase3.vue'),
    },
    {
        path: '/phase4',
        name: 'phase4',
        component: () => import('./../views/phases/Phase4.vue'),
    },
    {
        path: '/phase5',
        name: 'phase5',
        component: () => import('./../views/phases/Phase5.vue'),
    },
]
