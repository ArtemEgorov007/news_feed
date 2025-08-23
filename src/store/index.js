import {createStore} from "vuex";
import {postModule} from "@/store/postModule.js";


export default createStore({
    state: {
        likes: 1
    },
    modules: {
        post: postModule
    }
})
