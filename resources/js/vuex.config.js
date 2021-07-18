import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = {
    state:{
        isLogin:false
    },
    mutations:{
        setLogin(state, payload){
            state.isLogin = Boolean(payload)
        }
    },
    actions:{
        setLogin({commit}, payload){
            const isLogin = Boolean(payload)
            localStorage.setItem('isLogin', isLogin)
            commit('setLogin', isLogin)
        }
    }
}

export default new Vuex.Store(store)
