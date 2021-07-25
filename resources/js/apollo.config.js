import Vue from 'vue'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import store from './vuex.config'
import {gqlErrors, AuthError} from './ultils.js'
const apolloClient = new ApolloClient({
    uri:"http://laravello.com/graphql",
    headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
    },
    credentials: 'include',
    onError: (err) => {
        console.log(err)
        try {
            gqlErrors(err)
        }catch (error){
           if(error instanceof AuthError){
               console.log('error', error)
               alert(error)
                   store.dispatch('setLogin', false)
                   store.dispatch('setAuthUser', null)
                   location.href = '/login'
           }
        }

        console.log('Global handle')
    }
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
})

export default apolloProvider
