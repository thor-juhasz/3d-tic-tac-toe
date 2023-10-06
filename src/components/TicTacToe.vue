<template>
    <template v-if="gameData.winner">
        <!--<div class="text-3xl" v-html="winner" />-->
        <div class="grid gap-2">
            <Column class="w-20 h-20 md:w-40 md:h-40 rounded-lg flex justify-center items-center"
                    :player="gameData.winner"
                    :highlight="false"
                    :disabled="true"
                    :game-number="gameNumber"
                    :column-number="1" />
        </div>
    </template>
    <template v-else>
        <div class="grid grid-cols-3 grid-rows-3 gap-2" :class="[gameData.highlight && 'highlight', hasNextMove && 'next-move']">
            <Column class="w-6 h-6 md:w-12 md:h-12 rounded-lg flex justify-center items-center"
                    v-for="(column, index) in gameData.columns"
                    :key="index"
                    :player="column"
                    :highlight="hasNextMove || gameData.highlight"
                    :disabled="column !== null || !hasNextMove"
                    :game-number="gameNumber"
                    :column-number="index + 1"
                    @column-click="columnClick(index as Values)"
                    @column-mouseover="columnMouseOver(index as Values)"
                    @column-mouseout="columnMouseOut(index as Values)" />
        </div>
    </template>
</template>

<script setup lang="ts">
import Column from '@/components/Column.vue'
import { GameData, Values } from '@/types.ts'

const props = defineProps<{
    gameData: GameData;
    hasNextMove: boolean;
    gameNumber: number;
}>()

const emit = defineEmits<{
    (e: 'column-click', column: Values): void
    (e: 'column-mouseover', column: Values): void
    (e: 'column-mouseout'): void
}>()

function columnClick(column: Values): void {
    isColumnAvailable(column) && emit('column-click', column)
}

function columnMouseOver(column: Values): void {
    isColumnAvailable(column) && emit('column-mouseover', column)
}

function columnMouseOut(column: Values): void {
    isColumnAvailable(column) && emit('column-mouseout')
}

function isColumnAvailable(column: Values): boolean {
    return props.hasNextMove && props.gameData.columns[column] === null
}
</script>

<style scoped>
div {
    @apply p-1 md:p-3 rounded-lg border border-transparent transition-transform duration-300;
}
div.highlight {
    @apply scale-105;
}
div.next-move {
    @apply border-emerald-400;
}
</style>
