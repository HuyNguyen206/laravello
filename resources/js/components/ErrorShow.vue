<template>
    <div v-if="errors.length" class="p-2 bg-red-400 text-gray-100 rounder-sm mb-6 text-sm text-center">
        <div v-for="(error, index) in errors" :key="index">
            <p v-html="error.message"></p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ErrorShow",
    props: ['errors']
}
</script>

<style scoped>

</style>
