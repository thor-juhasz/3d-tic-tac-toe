<template>
    <button :type="type"><slot /></button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    type?: 'button' | 'submit'
}>(), {
    type: 'button',
})
</script>

<style scoped>
button {
    @apply inline-flex justify-center rounded-md px-3 py-2 font-semibold text-xl text-gray-600 dark:text-white shadow-sm;
    @apply transition duration-150 bg-gray-600/10 dark:bg-white/10 hover:bg-gray-600/20 hover:dark:bg-white/20 shadow-gray-600/10 dark:shadow-white/10 hover:shadow-gray-600/20 hover:dark:shadow-white/20;
}
</style>
