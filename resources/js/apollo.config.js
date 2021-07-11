import Vue from 'vue'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

const apolloClient = new ApolloClient({
    uri:"http://laravello.com/graphql",
    headers: {
        'X_CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
    },
    credentials: 'include'
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
})

export default apolloProvider
