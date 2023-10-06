<template>
    <button :class="{ playerX: player === 'X', playerO: player === 'O', 'no-player': !player, highlight }"
            :aria-label="columnLabel"
            :disabled="disabled"
            @click="columnClick()"
            @mouseover="columnMouseOver()"
            @mouseout="columnMouseOut()">
        <template v-if="player === 'X'">
            <XIcon class="m-1.5 md:m-2.5 w-full h-full" :class="{ highlight }" />
        </template>
        <template v-else-if="player === 'O'">
            <OIcon class="m-1 md:m-1.5 w-full h-full" :class="{ highlight }" />
        </template>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import OIcon from '@/components/icons/OIcon.vue'
import XIcon from '@/components/icons/XIcon.vue'
import { Player } from '@/types.ts'

const props = defineProps<{
    player: Player;
    highlight: boolean;
    disabled: boolean;
    gameNumber: number;
    columnNumber: number;
}>()

const emit = defineEmits<{
    (e: 'column-click'): void
    (e: 'column-mouseover'): void
    (e: 'column-mouseout'): void
}>()

const columnLabel = computed(() => {
    return `Game ${props.gameNumber}, Column ${props.columnNumber}`
})

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
    @apply bg-slate-400/40 dark:bg-gray-600;
}
button:not([disabled]) {
    @apply transition-colors duration-300 hover:bg-slate-400/80 dark:hover:bg-gray-500;
}
button.highlight {
    @apply bg-slate-500/80 dark:bg-gray-400;
}
button[disabled] {
    @apply opacity-90 dark:opacity-90;
}
</style>
