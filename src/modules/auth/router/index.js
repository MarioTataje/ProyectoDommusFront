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
        path: '/register',
        name: 'register',
        component: () => import('./../views/Register.vue'),
    },
]
