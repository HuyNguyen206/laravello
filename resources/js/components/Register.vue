<template>
    <div class="bg-white sm:bg-gray-100 h-full flex justify-center">
        <div class="container mt-2 sm:mt-10 flex flex-col items-center">
            <div class="text-3xl text-blue-700 font-bold mb-10">
                <span>Laravello</span>
            </div>
            <div class="w-full sm:shadow-xl sm:bg-white sm:py-8 sm:px-12 text-center">
                <h3 class="text-blue-800 pb-8 font-bold">Sign up for your account</h3>
                <form action="" @submit.prevent="register">
                    <error-show :errors="errors"></error-show>
                    <input type="text" v-model="user.email"
                           class="border-solid border-2 rounded p-3 mb-3 bg-gray-100 border-gray-300 w-full focus:outline-none"
                           placeholder="Enter email">
                    <input type="text" v-model="user.name"
                           class="border-solid border-2 rounded p-3 mb-3 bg-gray-100 border-gray-300 w-full focus:outline-none"
                           placeholder="Enter full name">
                    <input type="password" v-model="user.password"
                           class="border-solid border-2 mb-3 rounded p-3 bg-gray-100 border-gray-300 w-full focus:outline-none"
                           placeholder="Enter password">
                    <!--            <input type="password" class="border-solid border-2 mb-3 rounded p-3 bg-gray-100 border-gray-300 w-full focus:outline-none" placeholder="Enter confirm password" >-->
                    <button type="submit"
                            class="hover:opacity-75 disabled:opacity-25 transition bg-green-500 rounded w-full py-2 text-white font-bold">
                        Sign up
                    </button>
                    <hr class="my-6 h-4">
                    <router-link :to="{name:'login'}" class="hover:underline">Already has an account? Log in
                    </router-link>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import ErrorShow from "./ErrorShow";
import AddRegisterUser from './../graphql/AddRegisterUser.graphql'
import {gqlErrors} from './../ultils'

export default {
    name: "Login",
    components:{ErrorShow},
    data() {
        return {
            user: {
                name: null,
                email: null,
                password: null
            },
            errors: []
        }
    },
    methods: {
        async register() {
            try {
                await this.$apollo.mutate({
                    mutation: AddRegisterUser,
                    variables: this.user
                })
                this.errors = []
                this.$store.dispatch('setLogin', true)
                this.$router.push({name: 'board'})

            } catch (err) {
                this.errors = gqlErrors(err)
            }

        }
    }
}
</script>

<style scoped>
.container {
    width: 300px;
    max-width: 300px;
}

@media (min-width: 640px) {
    .container {
        width: 400px;
        max-width: 400px;
    }
}
</style>
