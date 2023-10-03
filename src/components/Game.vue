<template>
    <div class="game flex flex-col flex-wrap flex-initial justify-center items-center">
        <p class="text-center text-2xl p-4">
            Current move:
            <template v-if="playerTurn === 'X'">
                <XIcon class="inline" />
            </template>
            <template v-else>
                <OIcon class="inline" />
            </template>
        </p>
        <div class="grid grid-cols-3 grid-rows-3 gap-2">
            <TicTacToe v-for="(game, index) in games"
                       :key="index"
                       :game-data="game"
                       :has-next-move="nextGameMove === index || nextGameMove === undefined"
                       @column-click="(column: Values) => columnClick(index as Values, column)"
                       @column-mouseover="(column: Values) => columnMouseOver(index as Values, column)"
                       @column-mouseout="columnMouseOut()" />
        </div>

        <Button class="mt-8" @click="resetGame()">Restart game</Button>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import OIcon from '@/components/icons/OIcon.vue'
import XIcon from '@/components/icons/XIcon.vue'
import TicTacToe from '@/components/TicTacToe.vue'
import { GameData, Player, Values } from '@/types.ts'

defineProps<{
    games: [GameData, GameData, GameData, GameData, GameData, GameData, GameData, GameData, GameData];
    playerTurn: Player;
    nextGameMove: Values | undefined;
}>()

const emit = defineEmits<{
    (e: 'column-click', game: Values, column: Values): void
    (e: 'column-mouseover', game: Values, column: Values): void
    (e: 'column-mouseout'): void
    (e: 'reset-game'): void
}>()

function columnClick(game: Values, column: Values): void {
    emit('column-click', game, column)
}

function columnMouseOver(game: Values, column: Values): void {
    emit('column-mouseover', game, column)
}

function columnMouseOut(): void {
    emit('column-mouseout')
}

function resetGame(): void {
    emit('reset-game')
}
</script>
