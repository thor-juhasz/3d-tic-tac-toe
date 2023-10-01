<template>
    <div class="container">
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

        <div class="victory flex flex-col flex-wrap flex-initial justify-center items-center" :class="[gameOver && 'show']">
            <p>Game winner</p>

            <div class="flex justify-center">
                <template v-if="playerTurn === 'X'">
                    <XIcon class="m-2.5 w-96 h-96" />
                </template>
                <template v-else>
                    <OIcon class="m-2.5 w-96 h-96" />
                </template>
            </div>

            <Button @click="resetGame()">Restart game</Button>

            <Fireworks />
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import Fireworks from '@/components/Fireworks.vue'
import OIcon from '@/components/OIcon.vue'
import TicTacToe from '@/components/TicTacToe.vue'
import XIcon from '@/components/XIcon.vue'
import { getWinner } from '@/helper.ts'
import { GameColumns, GameData, Player, Values } from '@/types.ts'
import { ref } from 'vue'

const defaultGameData: GameData = {
    columns:   [null, null, null, null, null, null, null, null, null],
    winner:    null,
    highlight: false,
}

const games = ref<[GameData, GameData, GameData, GameData, GameData, GameData, GameData, GameData, GameData]>([
    JSON.parse(JSON.stringify(defaultGameData)),
    JSON.parse(JSON.stringify(defaultGameData)),
    JSON.parse(JSON.stringify(defaultGameData)),
    JSON.parse(JSON.stringify(defaultGameData)),
    JSON.parse(JSON.stringify(defaultGameData)),
    JSON.parse(JSON.stringify(defaultGameData)),
    JSON.parse(JSON.stringify(defaultGameData)),
    JSON.parse(JSON.stringify(defaultGameData)),
    JSON.parse(JSON.stringify(defaultGameData)),
])

const playerTurn     = ref<Exclude<Player, null>>('X')
const nextGameMove   = ref<Values | undefined>(undefined)
const gameOver       = ref<boolean>(false)
const mainGameWinner = ref<Player>(null)

function columnClick(game: Values, column: Values): void {
    games.value[game].columns[column] = playerTurn.value
    games.value[game].winner = getWinner(games.value[game].columns)

    playerTurn.value = playerTurn.value === 'X' ? 'O' : 'X'

    const targetGameWinner = games.value[column].winner
    if (targetGameWinner !== null) {
        highlightAllUnfinishedGames()
        checkMainGameWinner()

        return
    }

    nextGameMove.value = column
    unhighlightAllGames()

    checkMainGameWinner()
}

function columnMouseOver(game: Values, column: Values): void {
    if (games.value[column].winner) {
        games.value.forEach((gameData, index) => {
            gameData.highlight = index === game || !gameData.winner
        })
    } else {
        unhighlightAllGames()
        games.value[column].highlight = true
    }
}

function columnMouseOut(): void {
    unhighlightAllGames()
}

function highlightAllUnfinishedGames(): void {
    nextGameMove.value = undefined
    games.value.forEach(game => {
        game.highlight = !game.winner
    })
}

function unhighlightAllGames(): void {
    games.value.forEach((game, index) => {
        game.highlight = nextGameMove.value === undefined || index === nextGameMove.value
    })
}

function checkMainGameWinner(): void {
    const columns: GameColumns = [null, null, null, null, null, null, null, null, null]
    games.value.forEach((game, index) => columns[index] = game.winner)

    const winner = getWinner(columns)
    if (winner) {
        gameOver.value = true
        mainGameWinner.value = winner
    }
}

function resetGame(): void {
    games.value = [
        JSON.parse(JSON.stringify(defaultGameData)),
        JSON.parse(JSON.stringify(defaultGameData)),
        JSON.parse(JSON.stringify(defaultGameData)),
        JSON.parse(JSON.stringify(defaultGameData)),
        JSON.parse(JSON.stringify(defaultGameData)),
        JSON.parse(JSON.stringify(defaultGameData)),
        JSON.parse(JSON.stringify(defaultGameData)),
        JSON.parse(JSON.stringify(defaultGameData)),
        JSON.parse(JSON.stringify(defaultGameData)),
    ]

    playerTurn.value = 'X'
    nextGameMove.value = undefined

    gameOver.value = false
    mainGameWinner.value = null
}
</script>

<style scoped>
.container {
    position: relative;
}
.game {
    position: relative;
}
.victory {
    position: absolute;
    top: -5%;
    left: -5%;
    width: 110%;
    height: 110%;
    @apply bg-slate-300 dark:bg-slate-900;
    opacity: 0;
    pointer-events: none;
    transition: opacity ease-in .4s;
}
.victory.show {
    opacity: 1;
    pointer-events: auto;
}
.victory p {
    @apply text-6xl;
}
</style>
