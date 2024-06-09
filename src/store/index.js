import {createStore} from 'vuex'

import auth from '../modules/auth/store';
import student from '../modules/student/store';

const store = createStore({
    modules: {
        auth,
        student
    }
})

export default store