<template>
    <div @click="addCard"
        class="rounded-sm p-2 text-gray-600 cursor-pointer hover:bg-gray-400 hover:text-gray-800 text-sm">
        Add new card
    </div>
</template>

<script>
export default {
    name: "CardAddButton",
    methods:{
        addCard(){
            this.$emit('addCard');
        }
    }
}
</script>

<style scoped>

</style>
