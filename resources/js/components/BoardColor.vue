<template>
<div :class="[colorMap500[color]]" @click="$emit('setActiveColor', color)" class="w-6 h-6 md:w-8 md:h-8 m-1 rounded-md cursor-pointer flex justify-center items-center text-xl text-white">
    <span v-if="activeColor == color">✓</span>
</div>
</template>

<script>
import {colorMap500} from './../ultils'
export default {
    name: "BoardColor",
    props:['color', 'activeColor'],
    computed:{
        colorMap500: () => colorMap500
    }
}
</script>

<style scoped>

</style>
