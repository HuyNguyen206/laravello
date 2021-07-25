<template>
<div class="bg-white sm:bg-gray-100 h-full flex justify-center">
    <div class="container mt-2 sm:mt-10 flex flex-col items-center">
            <div class="text-3xl text-blue-700 font-bold mb-10">
                <span>Laravello</span>
            </div>
        <div class="w-full sm:shadow-xl sm:bg-white sm:py-8 sm:px-12 text-center">
            <form action="" @submit.prevent="login">
                <error-show :errors="errors"></error-show>
                <h3 class="text-blue-800 pb-8 font-bold">Log in to Laravello</h3>
                <input v-model="email" type="email" class="border-solid border-2 rounded p-3 mb-3 bg-gray-100 border-gray-300 w-full focus:outline-none" placeholder="Enter email" >
                <input v-model="password" type="password" class="border-solid border-2 mb-3 rounded p-3 bg-gray-100 border-gray-300 w-full focus:outline-none" placeholder="Enter password" >
                <button  class="hover:opacity-75 disabled:opacity-25 transition bg-green-500 rounded w-full py-2 text-white font-bold">Login</button>
                <hr class="my-6 h-4">
                <router-link :to="{name:'register'}" class="hover:underline">Sign up a new account</router-link>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import ErrorShow from "./ErrorShow";
import LoginMutation from './../graphql/Login.graphql'
import {gqlErrors} from './../ultils'
export default {
    name: "Login",
    components: {ErrorShow},
    data(){
        return {
            email: null,
            password: null,
            errors: []
        }
    },
    methods:{
       async login(){
           try {
             let user =  await this.$apollo.mutate({
                   mutation:LoginMutation,
                   variables:{
                       email: this.email,
                       password: this.password
                   }
               })
               this.$store.dispatch('setAuthUser', user.data.login)
               this.$store.dispatch('setLogin', true)
               // this.$store.commit('setLogin', true)
               this.$router.push({name: 'board'})
               console.log(user)
           }catch (err){
               console.log(err.graphQLErrors)
               this.errors = gqlErrors(err)
           }
            console.log('hey')
        }
    }
}
</script>

<style scoped>
.container{
    width: 300px;
    max-width: 300px;
}
@media (min-width: 640px) {
    .container{
        width: 400px;
        max-width: 400px;
    }
}
</style>
