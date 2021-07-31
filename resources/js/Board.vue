<template>
    <div class="h-full flex flex-col">
        <div class="h-full flex flex-col" :class="[bgColor]">
            <div class="header text-white flex justify-between items-center mb-2">
                <div class="ml-2 w-1/3">
                    <user-board-drop-down v-if="isLogin"></user-board-drop-down>
                </div>
                <div class="text-lg opacity-50 cursor-pointer hover:opacity-75">Laravello</div>
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
            <div class="h-full flex flex-col flex-1">
                <div class="mx-4 mb-2 text-white font-bold text-lg">
                    <span v-if="$apollo.queries.board.loading">Loading...</span>
                    <span v-else>{{ board.title }}</span>
                </div>
                <div v-if="!$apollo.queries.board.loading" class="flex flex-1 items-start overflow-x-auto mx-2">
                    <list v-for="(cardList, index) in board.cardLists" :key="index" :cardList="cardList"></list>
                    <list-add-editor></list-add-editor>
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
import {EVENT_CARD_DELETE, EVENT_CARD_ADD, EVENT_CARD_UPDATE, EVENT_BOARD_ADD} from "./constant";
import {mapState} from 'vuex'
import {colorMap500, colorMap100, colorMap200} from './ultils'
import UserBoardDropDown from "./components/UserBoardDropDown";
import ListAddEditor from "./components/ListAddEditor";
export default {
    name: "Board",
    components: {UserBoardDropDown, List, ListAddEditor},
    apollo: {
        board: {
            query: BoardQuery,
            variables() {
                return {
                    id: parseInt(this.$route.params.id)
                }
            }
        }
    },
    computed: {
        bgColor() {
            console.log('board', this.board)
            return this.$apollo.loading ? 'bg-gray-500' : [colorMap500[this.board.color]]
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

        EventBus.$on('updateQueryCache', (payload) => {
            const data = payload.store.readQuery({
                query: BoardQuery,
                variables: {id: parseInt(this.board.id)}
            });
                let cardList = data.board.cardLists.find(list => {
                    return list.id == payload.cardListId
                })
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
