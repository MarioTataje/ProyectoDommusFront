import {createRouter, createWebHashHistory} from 'vue-router';
import authRouter from '../modules/auth/router';
import isAuthenticatedGuard from '../modules/auth/router/auth-guard';

const routes = [
    {
        path: "/",
        ...authRouter
    },
    /*{
        path: "/home",
        beforeEnter: [ isAuthenticatedGuard ],
        ...homeRouter
    }*/
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;