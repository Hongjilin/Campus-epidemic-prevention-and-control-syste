import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        img: '',
        name: ''
    },
    mutations: {
        getimg(state, val) {
            state.img = val
        },
        getuname(state, val) {
            state.name = val
        }
    },
    actions: {},
    modules: {}
})