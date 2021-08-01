<template>
    <div class="h-full flex flex-col">
        <div class="h-full flex flex-col" :class="[bgColor]">
            <div class="header text-white flex justify-between items-center mb-2">
                <div class="ml-2 w-1/3">
                    <user-board-drop-down v-if="isLogin"></user-board-drop-down>
                </div>
                <router-link :to="{name: 'home'}" class="text-lg opacity-50 cursor-pointer hover:opacity-75">Laravello</router-link>
                <div class="mr-2 w-1/3 text-right">
                    <div v-if="isLogin" class="flex items-center justify-end">
                    <span>
                        {{ user.name }}
                    </span>
                        <button class="ml-2 header-btn" @click="logout">Logout</button>
                    </div>
                    <div v-else>
                        <router-link class="header-btn" :to="{name: 'login'}">Login</router-link>
                        <router-link class="header-btn" :to="{name: 'register'}">Register</router-link>
                        <!--                    <button class="header-btn">Login</button>-->
                        <!--                    <button class="header-btn">Register</button>-->
                    </div>
                </div>
            </div>
            <div class="h-full flex flex-col flex-1" v-if="!isHomeRoute && isLogin">
                <div class="mx-4 mb-2 text-white font-bold text-lg">
                    <span v-if="$apollo.queries.board.loading">Loading...</span>
                    <span v-else-if="board">{{ board.title }}</span>
                    <span v-else-if="error">{{ error }}</span>
                </div>
                <div v-if="!$apollo.queries.board.loading && !error" class="flex flex-1 items-start overflow-x-auto mx-2">
                    <list v-for="(cardList, index) in board.cardLists" :key="index" :cardList="cardList"></list>
                    <list-add-editor :boardId="$route.params.id"></list-add-editor>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import EventBus from "./EventBus";
import List from "./components/List";
import BoardQuery from './graphql/BoardWithCardLists.gql'
import LogoutMutation from './graphql/Logout.graphql'
import {EVENT_CARD_DELETE, EVENT_CARD_ADD, EVENT_CARD_UPDATE, EVENT_CARDLIST_ADD} from "./constant";
import {mapState} from 'vuex'
import {colorMap500, colorMap100, colorMap200} from './ultils'
import UserBoardDropDown from "./components/UserBoardDropDown";
import ListAddEditor from "./components/ListAddEditor";
export default {
    name: "Board",
    data(){
        return{
            error: null
        }
    },
    components: {UserBoardDropDown, List, ListAddEditor},
    apollo: {
        board: {
            query: BoardQuery,
            variables() {
                return {
                    id: parseInt(this.$route.params.id)
                }
            },
            skip(){
                return this.isHomeRoute
            },
            error(error){
                this.error = error.graphQLErrors[0].message
                console.log('board log', error.graphQLErrors)
            },
            update(data){
                this.error = null
                return data.board
            }
        }
    },
    computed: {
        isHomeRoute(){
            return this.$route.name == 'home'
        },
        bgColor() {
            console.log('board', this.board)
            return !this.isHomeRoute ?
                this.$apollo.loading ? 'bg-gray-500' : [colorMap500[this.board?.color || "red"]] :
                'bg-green-500'

        },
        colorMap100: () => colorMap100,
        colorMap200: () => colorMap200,
        ...mapState([
            'user',
            'isLogin'
        ])
    },
    methods: {
        async logout() {
            try {
                const result = await this.$apollo.mutate({
                    mutation: LogoutMutation
                })
                if (result.data?.logout.id) {
                    this.$store.dispatch('setLogin', false)
                    this.$store.dispatch('setAuthUser', null)
                    return
                }
                console.log(result)
            } catch (err) {
                console.log(err)
            }

        }
    },
    created() {
        // if(this.$route.name == 'board'){
        //   let result = await this.$apollo.query({
        //         query:BoardQuery,
        //         variables:{
        //            id:parseInt(this.$route.params.id)
        //         }
        //     })
        //
        // }
        EventBus.$on('updateQueryCache', (payload) => {
            const data = payload.store.readQuery({
                query: BoardQuery,
                variables: {id: parseInt(this.board.id)}
            });
            let cardList
            if(payload.type !== EVENT_CARDLIST_ADD){
                 cardList = data.board.cardLists.find(list => {
                    return list.id == payload.cardListId
                })
            }
            switch (payload.type) {
                case EVENT_CARD_ADD:
                    cardList.cards.push(payload.addCard)
                    break
                case EVENT_CARD_DELETE:
                    cardList.cards.splice(payload.index, 1)
                    break
                case EVENT_CARD_UPDATE:
                    cardList.cards.splice(payload.index, 1, payload.card)
                    break
                case EVENT_CARDLIST_ADD:
                    data.board.cardLists.push(payload.addCardList)
                    break
            }

            payload.store.writeQuery({query: BoardQuery, data, variables: {id: parseInt(this.board.id)}})
        })
    }
}
</script>

<style scoped>
.header {
    height: 40px;
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
