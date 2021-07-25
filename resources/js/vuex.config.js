import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import Me from './graphql/Me.graphql'
import apollo from './apollo.config'

const store = {
    state: {
        isLogin: false,
        user: {}
    },
    mutations: {
        setLogin(state, payload) {
            state.isLogin = Boolean(payload)
        },
        setAuthUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        setLogin({commit}, payload) {
            const isLogin = Boolean(payload)
            localStorage.setItem('isLogin', isLogin)
            commit('setLogin', isLogin)
        },
        setAuthUser({commit}, user) {
            localStorage.setItem('user', JSON.stringify(user))
            commit('setAuthUser', user)
        },
        async updateCurrentLoginFromBE({commit, dispatch}) {
            try {
                let result = await apollo.defaultClient.query({
                    query: Me,
                    fetchPolicy: 'no-cache'
                })
                const user = result.data?.me
                if(user){
                    dispatch('setAuthUser', user)
                    dispatch('setLogin', true)
                }else{
                    dispatch('setAuthUser', null)
                    dispatch('setLogin', false)
                }


            } catch (err) {
                console.log(currentUser)
            }

        }
    }
}

export default new Vuex.Store(store)
