<template>
<card-editor v-model="title" @saveCard="addNewCard"></card-editor>
</template>

<script>
import AddCardMutation from "../graphql/AddCard.gql";
import EventBus from "../EventBus";
import {EVENT_CARD_ADD} from "../constant";
import CardEditor from "./CardEditor";
import {mapState} from 'vuex'
export default {
    name: "CardAddEditor",
    props: ['nextOrder', 'cardListId'],
    components: {CardEditor},
    data(){
        return {
            title: null
        }
    },
    computed:{
      ...mapState({
          user: state => state.user
      })
    },
    methods: {
        addNewCard() {
            const self = this
            this.$apollo.mutate({
                mutation: AddCardMutation,
                variables: {
                    title: this.title,
                    order: this.nextOrder,
                    cardListId: this.cardListId,
                    userId: this.user.id
                },
                update(store, {data: {addCard}}) {
                    EventBus.$emit('updateQueryCache', {
                        type: EVENT_CARD_ADD,
                        store,
                        addCard,
                        cardListId: self.cardListId
                    })
                }
            }).then(data => {
                this.title = null
                EventBus.$emit('cancelSaveCard')
            })
        }
    }
}
</script>

<style scoped>

</style>
