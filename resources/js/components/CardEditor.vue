<template>
    <div>
    <textarea v-bind:value="value"
              v-on:input="$emit('input', $event.target.value)"
              @keyup.esc="cancel" @keyup.enter="$emit('saveCard')" ref="card" class="shadow-card rounded-md py-1 px-2 outline-none
 w-full text-gray-900 text-sm bg-white h-16 resize-none"
              placeholder="Enter a title..."></textarea>
        <div class="flex justify-start items-center">
            <button @click="$emit('saveCard')"
                    class="cursor-pointer bg-blue-700 text-white font-semibold focus:outline-none rounded-sm px-2 py-1 hover:bg-blue-600 transition">
                Save card
            </button>
            <button @click="cancel"
                    class="ml-1 rounded-md  p-1 transition focus:outline-none cursor-pointer hover:bg-gray-400">&times;
            </button>
        </div>

    </div>
</template>

<script>
import EventBus from "../EventBus";

export default {
    name: "CardEditor",
    props: ['value'],
    methods: {
        cancel() {
            EventBus.$emit('cancelSaveCard')
        }
    },
    mounted() {
        this.$refs.card.focus()
    }
}
</script>

<style scoped>

</style>
