<template>
    <div class="list bg-gray-300 rounded-sm mr-2 p-2 list">
        <div class="flex justify-between">
            <div class="text-gray-800 pl-2 pb-2 font-bold">{{cardList.title}}</div>
        </div>
        <card v-for="(card, index) in cardList.cards" :key="index" :card="card" :index="index"></card>
        <div v-if="canAddCard">
            <card-add-button v-if="isAdd" @addCard="isAdd=false" ></card-add-button>
            <card-add-editor v-else  :boardId="cardList.board.id" :nextOrder="nextOrder" :cardListId="cardList.id"></card-add-editor>
        </div>
    </div>
</template>

<script>
import Card from "./Card";
import CardAddButton from "./CardAddButton";
import CardAddEditor from "./CardAddEditor";
import EventBus from "../EventBus";
import {mapState} from 'vuex'
export default {
    name: "List",
    components: {Card, CardAddButton, CardAddEditor},
    props:['cardList'],
    data(){
        return {
            isAdd: true
        }
    },
    computed:{
        ...mapState({
           canAddCard(state){
               return state?.user?.id == this.cardList.board.owner.id
           }
        }),
        nextOrder(){
            let n = this.cardList.cards.length
            return n > 0 ? this.cardList.cards[n-1].order + 1 : 1
        }
    },
    created() {
        EventBus.$on('cancelSaveCard', () => {
            this.isAdd=true
        })
    }
}
</script>

<style scoped>
.list {
    width: 250px;
    min-width: 250px ;
}
</style>
