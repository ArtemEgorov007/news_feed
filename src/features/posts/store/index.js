import {createStore} from "vuex";
import {postModule} from "./postModule.js";


export default createStore({
    state: {
        likes: 1
    },
    modules: {
        post: postModule
    }
})
