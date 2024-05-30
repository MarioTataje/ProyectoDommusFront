import {createRouter, createWebHashHistory} from 'vue-router';
import authRouter from '../modules/auth/router';
import profilesRouter from '../modules/profiles/router';

const routes = [
    ...authRouter,
    ...profilesRouter,
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