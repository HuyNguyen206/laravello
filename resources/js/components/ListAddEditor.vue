<template>
    <div>
        <div v-if="!isListCreate" @click="isListCreate=true" class="list bg-white hover:bg-gray-500 rounded-sm p-2 mr-2 opacity-75 text-black cursor-pointer">
            +&nbsp;Add another list
        </div>
        <card-editor class="list" v-else v-model="title" @saveCard="addNewCardList"></card-editor>
    </div>

</template>

<script>
import CardEditor from "./CardEditor";
import EventBus from "../EventBus";
export default {
    name: "ListAddEditor",
    components:{CardEditor},
    data() {
        return {
            isListCreate: false,
            title: null
        }
    },
    methods:{
        addNewCardList(){

        }
    },
    created() {
        EventBus.$on('cancelSaveCard', () => {
            this.isListCreate=false;
            this.title=null
        })
    }
}
</script>

<style scoped>

</style>
