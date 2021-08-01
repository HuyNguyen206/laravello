<template>
    <modal @close="$emit('modalClose')" :show="isOpenBoardModal" width="500">
        <div class="flex">
            <div class="rounded-md p-4 text-black w-2/3 mr-2" :class="[colorMap500[activeColor]]">
                <input v-model='title' type="text" placeholder="Add board title"
                       class="transition title rounded-md text-white outline-none py-1 px-2 font-bold w-full hover:opacity-50 placeholder-gray-800 ">
            </div>
            <div class="w-1/3">
                <div class="flex w-full" v-for="(colorRow,index1) in colorGrid" :key="index1">
                    <board-color @setActiveColor="activeColor = $event" v-for="(color,index2) in colorRow"
                                 :key="index1+'-'+index2" :color="color" :active-color="activeColor"></board-color>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <button @click="addBoard" :disabled="isCreateDisable"
                    class="rounded-sm py-2 px-4 text-white cursor-pointer transition"
                    :class="classCreateButton">Create
            </button>
        </div>
    </modal>
</template>

<script>
import Modal from "./Modal";
import BoardColor from "./BoardColor";
import AddBoard from './../graphql/AddBoard.graphql'
import {mapState} from 'vuex'
import {colorGrid, colorMap500, colorMap200} from './../ultils';
import EventBus from "../EventBus";

export default {
    data() {
        return {
            activeColor: colorGrid[0][0],
            title: null,
        }
    },
    name: "BoardAddModal",
    components: {Modal, BoardColor},
    props: ['isOpenBoardModal'],
    computed: {
        classCreateButton() {
            if (this.isCreateDisable) {
                 return [this.colorMap200[this.activeColor], 'cursor-not-allowed'];
            } else {
                return [this.colorMap500[this.activeColor]];
            }
        },
    isCreateDisable() {
        return this.title == null || this.title.length == 0
    },
    colorGrid: () => colorGrid,
    colorMap500: () => colorMap500,
    colorMap200: () => colorMap200,
    ...mapState({
        user: (state) => state.user
    })
},
methods: {
    addBoard()
    {
        this.$apollo.mutate({
            mutation: AddBoard,
            variables: {
                title: this.title,
                color: this.activeColor,
                userId: parseInt(this.user.id)
            },
            update(store, {data: {addBoard}}) {
                EventBus.$emit('updateBoardQueryCache', {
                    type: EVENT_BOARD_ADD,
                    store,
                    addBoard
                })
            }
        }).then(data => {
            this.title = null
            this.$emit('modalClose')
            // EventBus.$emit('cancelSaveCard')
        })
    }
}
}
</script>

<style scoped>
.title {
    background-color: hsla(0, 0%, 100%, 0);
}

.title:hover, .title:focus {
    background-color: hsla(0, 0%, 100%, 0.2);
}
</style>
