export type Player = 'X' | 'O' | null
export type Values = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type GameColumns = [Player, Player, Player, Player, Player, Player, Player, Player, Player]
export interface GameData {
    columns: GameColumns;
    winner: Player;
    highlight: boolean;
}
