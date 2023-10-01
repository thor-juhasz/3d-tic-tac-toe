<template>
    <button :class="{ playerX: player === 'X', playerO: player === 'O', 'no-player': !player, highlight }"
            :disabled="disabled"
            @click="columnClick()"
            @mouseover="columnMouseOver()"
            @mouseout="columnMouseOut()">
        <template v-if="player === 'X'">
            <XIcon class="m-2.5 w-full h-full" :class="{ highlight }" />
        </template>
        <template v-else-if="player === 'O'">
            <OIcon class="m-1.5 w-full h-full" :class="{ highlight }" />
        </template>
    </button>
</template>

<script setup lang="ts">
import OIcon from '@/components/OIcon.vue'
import XIcon from '@/components/XIcon.vue'
import { Player } from '@/types.ts'

const props = defineProps<{
    player: Player;
    highlight: boolean;
    disabled: boolean;
}>()

const emit = defineEmits<{
    (e: 'column-click'): void
    (e: 'column-mouseover'): void
    (e: 'column-mouseout'): void
}>()

function columnClick(): void {
    isColumnAvailable() && emit('column-click')
}

function columnMouseOver(): void {
    isColumnAvailable() && emit('column-mouseover')
}

function columnMouseOut(): void {
    isColumnAvailable() && emit('column-mouseout')
}

function isColumnAvailable(): boolean {
    return !props.disabled && props.player === null
}
</script>

<style scoped>
button {
    @apply bg-gray-400 dark:bg-gray-600;
}
button:not([disabled]) {
    @apply transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-500;
}
button.highlight {
    @apply bg-gray-200 dark:bg-gray-400;
}
button[disabled] {
    @apply opacity-50;
}

.playerX.highlight:not([disabled]):deep(svg) {
    @apply fill-red-400 dark:fill-red-600;
}
.playerO.highlight:not([disabled]):deep(svg) {
    @apply fill-blue-400 dark:fill-blue-600;
}
.no-player :deep(svg) {
    @apply fill-emerald-400 dark:fill-emerald-600;
}

</style>
