import { GameColumns, Player } from '@/types.ts'

export function getWinner(gameColumns: GameColumns): Player {
    // Define winning combinations as arrays of indices
    const winCombos = [
        // Rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // Diagonals
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (const combo of winCombos) {
        const [a, b, c] = combo
        if (gameColumns[a] && gameColumns[a] === gameColumns[b] && gameColumns[a] === gameColumns[c]) {
            return gameColumns[a]
        }
    }

    // If no winner is found
    return null
}