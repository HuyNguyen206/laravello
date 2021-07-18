<template>
    <div class="h-full flex flex-col bg-purple-500">
        <div class="header text-white flex justify-between items-center mb-2 bg-purple-600">
            <div class="ml-2 w-1/3">X</div>
            <div class="text-lg opacity-50 cursor-pointer hover:opacity-75">Laravello</div>
            <div class="mr-2 w-1/3 text-right">
                <div v-if="isLogin">
                    <button class="header-btn" @click="logout">Logout</button>
                </div>
                <div v-else>
                    <router-link class="header-btn" :to="{name: 'login'}">Login</router-link>
                    <router-link class="header-btn" :to="{name: 'register'}">Register</router-link>
<!--                    <button class="header-btn">Login</button>-->
<!--                    <button class="header-btn">Register</button>-->
                </div>
            </div>
        </div>
        <div class="h-full flex flex-col flex-1">
            <div class="mx-4 mb-2 text-white font-bold text-lg">
               <span v-if="$apollo.queries.board.loading">Loading...</span>
                <span v-else>{{board.title}}</span>
            </div>
            <div v-if="!$apollo.queries.board.loading" class="flex flex-1 items-start overflow-x-auto mx-2">
                    <list v-for="(cardList, index) in board.cardLists" :key="index" :cardList="cardList"></list>
            </div>
        </div>
    </div>
</template>

<script>
import EventBus from "./EventBus";
import List from "./components/List";
import BoardQuery from './graphql/BoardWithCardLists.gql'
import LogoutMutation from './graphql/Logout.graphql'
import {EVENT_CARD_DELETE, EVENT_CARD_ADD, EVENT_CARD_UPDATE} from "./constant";
export default {
    name: "Board",
    components: {List},
    apollo: {
        board: {
            query: BoardQuery,
            variables: {
                id: 1
            }
        }
    },
    computed:{
        isLogin(){
            return this.$store.state.isLogin
        }
    },
    methods:{
        async logout(){
            try {
                await this.$apollo.mutate({
                    mutation: LogoutMutation
                })
                this.$store.dispatch('setLogin', false)
            }catch (err){
                console.log(err)
            }

        }
    },
    created() {
        EventBus.$on('updateQueryCache', (payload) => {
            const data = payload.store.readQuery({
                query:BoardQuery,
                variables:{id: parseInt(this.board.id) }
            });
            let cardList =  data.board.cardLists.find(list => {
                return list.id == payload.cardListId
            })
            switch (payload.type){
                case EVENT_CARD_ADD:
                    cardList.cards.push(payload.addCard)
                    break
                case EVENT_CARD_DELETE:
                    cardList.cards.splice(payload.index, 1)
                    break
                case EVENT_CARD_UPDATE:
                    cardList.cards.splice(payload.index, 1, payload.card)
                    break
            }

            payload.store.writeQuery({query: BoardQuery, data})
        })
    }
}
</script>

<style scoped>
.header {
    height: 40px
}
</style>
