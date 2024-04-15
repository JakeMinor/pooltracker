export type BallColour = "red" | "yellow" | "spots" | "stripes"

export interface Game {
    id: string,
    location: string,

    player1Id: string,
    player1Name: string,
    player1BallColour: BallColour,
    player1Score: number,
    player1Verified: boolean,

    player2Id: string,
    player2Name: string,
    player2Score: number,
    player2BallColour: BallColour,
    player2Verified: boolean
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
    avatar: string
}