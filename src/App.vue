<template>
    <Header @show-help="showHelp = true" />

    <Game :games="games"
          :player-turn="playerTurn"
          :next-game-move="nextGameMove"
          @column-click="(game, column) => columnClick(game as Values, column as Values)"
          @column-mouseover="(game, column) => columnMouseOver(game as Values, column as Values)"
          @column-mouseout="columnMouseOut()"
          @reset-game="resetGame()" />

    <GameOver :open="gameOver" :winner="mainGameWinner" @close="resetGame()" />
    <HowToPlay :open="showHelp" @close="showHelp = false" />

    <footer class="text-center mt-8">
        "3D" Tic-Tac-Toe &mdash; &copy; Thor Juhasz 2023
    </footer>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import HowToPlay from '@/components/HowToPlay.vue'
import { onBeforeMount, ref } from 'vue'

import Game from '@/components/Game.vue'
import GameOver from '@/components/GameOver.vue'
import { getWinner, remainingColumns } from '@/helper.ts'
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
const showHelp       = ref<boolean>(false)

onBeforeMount(() => {
    const osPrefersDark = !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches
    if (osPrefersDark || localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
})

function columnClick(game: Values, column: Values): void {
    games.value[game].columns[column] = playerTurn.value
    games.value[game].winner = getWinner(games.value[game].columns)

    playerTurn.value = playerTurn.value === 'X' ? 'O' : 'X'

    const targetGameWinner = games.value[column].winner
    if (targetGameWinner !== null || remainingColumns(game, column, games.value[column].columns) <= 0) {
        nextGameMove.value = undefined
    } else {
        nextGameMove.value = column
    }

    unhighlightAllGames()
    checkMainGameWinner()
}

function columnMouseOver(game: Values, column: Values): void {
    if (games.value[column].winner || remainingColumns(game, column, games.value[column].columns) <= 1) {
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

function unhighlightAllGames(): void {
    games.value.forEach((game/*, index*/) => {
        game.highlight = false
    })
}

function checkMainGameWinner(): void {
    const columns: GameColumns = [null, null, null, null, null, null, null, null, null]
    games.value.forEach((game, index) => columns[index] = game.winner)

    const winner = getWinner(columns)
    if (winner) {
        gameOver.value = true
        mainGameWinner.value = winner
        return
    }

    let finishedGames = 0
    games.value.forEach((game, index) => {
        if (game.winner || remainingColumns(index, 0, game.columns) <= 0) {
            finishedGames++
        }
    })

    // No winner is possible!
    if (finishedGames === 9) {
        gameOver.value = true
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
