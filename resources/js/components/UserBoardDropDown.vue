<template>
    <div>
        <button class="header-btn" @click="isOpenBoardMenu = !isOpenBoardMenu">Boards</button>
        <drop-down-menu :show="isOpenBoardMenu">
            <div class="text-gray-600 text-xs font-semibold mb-2 ml-2">BOARDS</div>
            <div v-for="(board, index) in userBoards" :key="index"
                 :class="['bg-'+ board.color + '-100']"
                 class="m-2 rounded-sm opacity-100 hover:opacity-75 transition text-gray-700 font-bold flex cursor-pointer">
                <div :class="['bg-'+ board.color + '-200']" class="w-10 rounded-sm rounded-r-none"></div>
                <div class="p-2">{{board.title}}</div>
            </div>
        </drop-down-menu>
    </div>
</template>

<script>
import DropDownMenu from "./DropDownMenu";
import UserBoards from './../graphql/UserBoards.graphql'
import {mapState} from 'vuex'
import {colorMap500} from './../ultils'

export default {
    name: "UserBoardDropDown",
    data() {
        return {
            isOpenBoardMenu: false
        }
    },
    // methods: {
    //     mapColorBoard(color) {
    //         return colorMap500[color];
    //     }
    // },
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
    components: {DropDownMenu}
}
</script>

<style scoped>

</style>
