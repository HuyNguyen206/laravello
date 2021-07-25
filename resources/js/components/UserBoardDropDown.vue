<template>
    <div>
        <button class="header-btn" @click="isOpenBoardMenu = !isOpenBoardMenu">Boards</button>
        <drop-down-menu @close="isOpenBoardMenu = false" :show="isOpenBoardMenu">
            <div class="text-gray-600 text-xs font-semibold mb-1 ml-2">BOARDS</div>
                <router-link v-for="(board, index) in userBoards" :key="index"
                             :class="['bg-'+ board.color + '-100']"
                             class="rounded-sm opacity-100 hover:opacity-75 transition text-gray-700 font-bold flex" :to="{name:'board', params:{id: board.id}}">
                <div :class="['bg-'+ board.color + '-200']" class="w-1/5 rounded-sm rounded-r-none"></div>
                <div class="p-2 w-4/5">{{board.title}}</div>
                </router-link>
        <div class="rounded-sm hover:bg-gray-200 p-2 underline cursor-pointer mt-2" @click="isOpenBoardModal = true">Create new board...</div>
        <modal @close="isOpenBoardModal=false" :show="isOpenBoardModal" width="300" height="300">
            This is content of modal
        </modal>
        </drop-down-menu>
    </div>
</template>

<script>
import DropDownMenu from "./DropDownMenu";
import UserBoards from './../graphql/UserBoards.graphql'
import {mapState} from 'vuex'
import {colorMap500} from './../ultils'
import Modal from "./Modal";


export default {
    name: "UserBoardDropDown",
    data() {
        return {
            isOpenBoardMenu: false,
            isOpenBoardModal: false
        }
    },
    methods: {
        // mapColorBoard(color) {
        //     return colorMap500[color];
        // }
        // hideDropDown(){
        //     this.isOpenBoardMenu = false
        // }
    },
    computed: {
        ...mapState({
            userId: state => state.user.id
        })
    },
    apollo: {
        userBoards: {
            query: UserBoards,
            variables() {
                return {
                    userId: this.userId
                }
            },
            skip(){
                return !this.userId
            }
        }
    },
    components: {DropDownMenu,Modal}
}
</script>

<style scoped>

</style>
