<template>
    <OIcon />
</template>

<script setup lang="ts">
import OIcon from "@/assets/player-o.svg"
</script>

<style scoped>
svg {
    @apply fill-blue-500 dark:fill-sky-500;
}
svg.highlight {
    @apply fill-blue-700 dark:fill-sky-600;
}
</style>
