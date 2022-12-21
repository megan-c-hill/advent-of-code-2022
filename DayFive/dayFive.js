import {readDataIntoArray} from "../utils/file-utils.js";

const parseQueues = (queueString) => {
    const rows = queueString.split('\n');

    return rows.reduce((accum, row) => {
        row.split('').forEach((cell, index) => {
            if (row.charAt(index - 1) === '[' && row.charAt(index + 1) === ']') {
                const expectedIndex = Math.floor(index / 4);

                if (!accum[expectedIndex]) {
                    accum[expectedIndex] = []
                }

                accum[expectedIndex].push(cell);
            }
        });

        return accum;
    }, []);
}

const parseMoves = (movesString) => {
    return movesString.split('\n').map((string) => {
        return [...string.matchAll(/\d+/g)].map((regexMatch) => Number(regexMatch[0]));
    });
}

const readInData = () => {
    const [queueString, movesString] = readDataIntoArray('./DayFive/DayFive.txt', false, '\n\n');

    const queues = parseQueues(queueString);
    const moves = parseMoves(movesString);

    return {
        moves,
        queues
    };
}

const executeMoves = (moves, queues) => {
    moves.forEach((move) => {
        let count = 0;
        while (count < move[0]) {
            const item = queues[move[1] - 1].shift();
            queues[move[2] - 1].unshift(item);
            count++;
        }
    });
}

const executeNewMoves = (moves, queues) => {
    moves.forEach((move) => {
        const items = queues[move[1] - 1].splice(0, move[0]);
        queues[move[2] - 1].unshift(...items);
    });
}

const getAnswer = (queues) => {
    return queues.reduce((accum, queue) => accum += queue[0], '')
}

const result = readInData();
executeMoves(result.moves, result.queues);
const partOneAnswer = getAnswer(result.queues);
console.log('partOneAnswer', partOneAnswer);
const result2 = readInData();
executeNewMoves(result2.moves, result2.queues);
const partTwoAnswer = getAnswer(result2.queues);
console.log('partTwoAnswer', partTwoAnswer);