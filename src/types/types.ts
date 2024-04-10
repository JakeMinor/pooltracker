export type BallColour = "red" | "yellow" | "spots" | "stripes"

export interface Game {
    id: string,
    player1: User | string,
    player2: User | string,
    location: Location,
    player1Score: number,
    player2Score: number,
    player1BallColour: BallColour,
    player2BallColour: BallColour
}

export interface Location {
    id: string,
    name: string,
    ballColours: BallColour[]
}

export interface User {
    id: string,
    name: string,
    email: string,
    avatarUrl: string
}