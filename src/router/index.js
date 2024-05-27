import {createRouter, createWebHashHistory} from 'vue-router';
import authRouter from '../modules/auth/router';

const routes = [
    ...authRouter,
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