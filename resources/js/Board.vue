<template>
    <div class="h-full flex flex-col bg-purple-500">
        <div class="header text-white flex justify-between items-center mb-2 bg-purple-600">
            <div class="ml-2 w-1/3">X</div>
            <div class="text-lg opacity-50 cursor-pointer hover:opacity-75">Laravello</div>
            <div class="mr-2 w-1/3 text-right">X</div>
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
import List from "./components/List";
import gql from "graphql-tag";
import BoardQuery from './graphql/BoardWithCardLists.gql'
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
    }
}
</script>

<style scoped>
.header {
    height: 40px
}
</style>
