<template>
    <div>
        <div v-if="!isEdit" class="shadow-card bg-white rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2 flex justify-between group">
            <div>
                {{ card.title }}
            </div>
            <div v-if="canUpdateOrDelete" class="flex group-hover:opacity-100 opacity-0 transition text-gray-400">
                <div class="mr-1 hover:text-gray-800" @click="editCard">E</div>
                <div class="hover:text-gray-800" @click="deleteCard">D</div>
            </div>
        </div>
        <card-editor @saveCard="updateCard" class="mb-2" v-model="title" v-else></card-editor>
    </div>
</template>

<script>
import EventBus from "../EventBus";
import DeleteCard from './../graphql/DeleteCard.gql'
import {EVENT_CARD_DELETE} from "../constant";
import {EVENT_CARD_UPDATE} from "../constant";
import CardEditor from "./CardEditor";
import UpdateCard from './../graphql/UpdateCard.graphql'
import {mapState} from 'vuex'
export default {
    name: "Card",
    components:{CardEditor},
    props: ['card', 'index'],
    data(){
      return{
          isEdit: false,
          title: this.card.title
      }
    },
    computed:{
      ...mapState({
          isLogin: 'isLogin',
          canUpdateOrDelete(state){
              return state.isLogin && this.card.owner.id == state.user?.id
          }
      })
    },
    methods:{
        updateCard(){
            const self = this
            this.$apollo.mutate({
                mutation: UpdateCard,
                variables:{
                    id: this.card.id,
                    title: this.title
                },
                update(store, {data: {updateCard}}){
                    EventBus.$emit('updateQueryCache', {store, type:EVENT_CARD_UPDATE, cardListId: self.card.cardList.id, card: updateCard, index: self.index})
                }
            })
            .then(() => {
                EventBus.$emit('cancelSaveCard')
            })
        },
        editCard(){
            this.isEdit=true

        },
        deleteCard(){
            const self = this
            this.$apollo.mutate({
                mutation: DeleteCard,
                variables:{
                    id: this.card.id
                },
                update(store){
                    EventBus.$emit('updateQueryCache', {type: EVENT_CARD_DELETE, store, cardListId: self.card.cardList.id, index: self.index})
                }
            })
        }
    },
    created() {
        EventBus.$on('cancelSaveCard', () => {
            this.title = this.card.title
            this.isEdit = false
        })
    }

}
</script>

<style scoped>

</style>
