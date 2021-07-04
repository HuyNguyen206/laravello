<template>
    <div class="bg-gray-300 rounded-sm mr-2 p-2 list">
        <div class="flex justify-between">
            <div class="text-gray-800 pl-2 pb-2 font-bold">{{cardList.title}}</div>
        </div>
        <card v-for="(card, index) in cardList.cards" :key="index" :card="card"></card>
        <card-add-button @addCard="isAdd=false" v-if="isAdd"></card-add-button>
        <card-editor :boardId="cardList.board.id" :nextOrder="nextOrder" :cardListId="cardList.id" @cancelAddCard="isAdd=true" v-else></card-editor>
    </div>
</template>

<script>
import Card from "./Card";
import CardAddButton from "./CardAddButton";
import CardEditor from "./CardEditor";
export default {
    name: "List",
    components: {Card, CardAddButton, CardEditor},
    props:['cardList'],
    data(){
        return {
            isAdd: true
        }
    },
    computed:{
        nextOrder(){
            let n = this.cardList.cards.length
            return this.cardList.cards[n-1].order + 1
        }
    }
}
</script>

<style scoped>
.list {
    width: 250px;
    min-width: 250px ;
}
</style>
