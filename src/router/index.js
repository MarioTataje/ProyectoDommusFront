import {createRouter, createWebHashHistory} from 'vue-router';
import authRouter from '../modules/auth/router';
import studentRouter from '../modules/student/router';

const routes = [
    ...authRouter,
    ...studentRouter,
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