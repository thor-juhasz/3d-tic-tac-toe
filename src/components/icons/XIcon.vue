<template>
    <XIcon />
</template>

<script setup lang="ts">
import XIcon from "@/assets/player-x.svg"
</script>

<style scoped>
svg {
    @apply fill-rose-600 dark:fill-red-500;
}
svg.highlight {
    @apply fill-rose-700 dark:fill-red-600;
}
svg use {
    height: 1em;
    width: 1em;
}
</style>
