<template>
    <transition name="fade">
        <div v-if="show"  class="overlay fixed z-30 top-0 bottom-0 left-0 w-full h-full bg-black">
            <div @click.self="$emit('close')" class="w-full h-full bg-transparent flex justify-center items-center">
                <div class="text-white" :style="style" >
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "Modal",
    props: ['width', 'show'],
    computed:{
        style(){
            return {
                width: `${this.width}px`
            }
        }
    }
}
</script>

<style scoped>
.overlay{
    background-color: rgba(0, 0, 0, .7);
}
</style>
