<template>
<div>
    <textarea @keyup.esc="$emit('cancelAddCard')" @keyup.enter="addNewCard" ref="card" class="shadow-card rounded-md py-1 px-2 outline-none
 w-full text-gray-900 text-sm bg-white h-16 resize-none"
    placeholder="Enter a title for this card..." v-model="title"></textarea>
<div class="flex justify-start items-center">
    <button @click="addNewCard" class="cursor-pointer bg-blue-700 text-white font-semibold focus:outline-none rounded-sm px-2 py-1 hover:bg-blue-600 transition">Add Card</button>
    <button  @click="$emit('cancelAddCard')" class="ml-1 rounded-md  p-1 transition focus:outline-none cursor-pointer hover:bg-gray-400">&times;</button>
</div>

</div>
</template>

<script>
import AddCardMutation from './../graphql/AddCard.gql'
import BoardQuery from './../graphql/BoardWithCardLists.gql'
export default {
    name: "CardEditor",
    props:['cardListId', 'nextOrder', 'boardId'],
    data(){
        return {
            title: null
        }
    },
    methods:{
      addNewCard(){
          const self = this
          this.$apollo.mutate({
              mutation:AddCardMutation,
              variables:{
                  title: this.title,
                  order: this.nextOrder,
                  cardListId: this.cardListId,
                  userId: 1
              },
              update(store, {data: {addCard}}){
                  const data = store.readQuery({
                      query:BoardQuery,
                      variables:{id: parseInt(self.boardId) }
                  });
                  data.board.cardLists.find(list => {
                      return list.id == self.cardListId
                  }).cards.push(addCard)
                  store.writeQuery({query: BoardQuery, data})
              }
          }).then(data => {
              this.title = null
          })
      }
    },
    mounted() {
        this.$refs.card.focus()
    }
}
</script>

<style scoped>

</style>
