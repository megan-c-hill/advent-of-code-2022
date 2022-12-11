import {readDataIntoArray} from "../utils/file-utils.js";

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

const SCORE_PER_MOVE = {
    X: ROCK,
    Y: PAPER,
    Z: SCISSORS,
    A: ROCK,
    B: PAPER,
    C: SCISSORS
};

const SCORE_RESULT = {
    X: 0,
    Y: 3,
    Z: 6
}

const computeRoundScore = (opponentMove, yourMove) => {
    const yourScore = SCORE_PER_MOVE[yourMove];
    const opponentScore = SCORE_PER_MOVE[opponentMove];
    const totalScore = yourScore + opponentScore;

    if(yourScore === opponentScore) {
        return 3; // A draw occurred
    }

    if(totalScore === ROCK + PAPER && yourScore === PAPER) {
        return 6; // You won
    }

    if(totalScore === PAPER + SCISSORS && yourScore === SCISSORS) {
        return 6; // You won
    }

    if(totalScore === ROCK + SCISSORS && yourScore === ROCK) {
        return 6; // You won
    }

    return 0;
}

const computeYourMoveScore = (opponentMove, desiredResult) => {
    if(desiredResult === 'Y') { // Tie
        return SCORE_PER_MOVE[opponentMove];
    }

    if(desiredResult === 'X') { // Lose
        const MOVE_TO_LOSE_MAP = {
            A: SCISSORS,
            B: ROCK,
            C: PAPER
        }

        return MOVE_TO_LOSE_MAP[opponentMove]
    }

    // Win
    const MOVE_TO_WIN_MAP = {
        A: PAPER,
        B: SCISSORS,
        C: ROCK
    }

    return MOVE_TO_WIN_MAP[opponentMove]
}

const computeScoreWithBothPlayerMoves = () => {
    const rounds = readDataIntoArray('./DayTwo/DayTwo.txt', false, '\n');

    const totalScore = rounds.reduce((accum, moves) => {
        const [opponentMove, _, yourMove] = moves.split('');

        accum += SCORE_PER_MOVE[yourMove]
        accum += computeRoundScore(opponentMove, yourMove);
        
       return accum;
    }, 0);

    console.log('partOneAnswer', totalScore);
}

const computeScoreWithRoundResults = () => {
    const rounds = readDataIntoArray('./DayTwo/DayTwo.txt', false, '\n');

    const totalScore = rounds.reduce((accum, moves) => {
        const [opponentMove, _, roundResult] = moves.split('');

        accum += SCORE_RESULT[roundResult]
        accum += computeYourMoveScore(opponentMove, roundResult);

        return accum;
    }, 0);
    
    console.log('partTwoAnswer', totalScore);
}

computeScoreWithBothPlayerMoves();
computeScoreWithRoundResults();