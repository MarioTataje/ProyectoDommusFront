import LockScreen from './../views/LockScreen.vue'

export default [
    {
        name: 'LockScreen',
        path: "/",
        component: LockScreen
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('./../views/Login.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('./../views/Register.vue'),
    },
]
