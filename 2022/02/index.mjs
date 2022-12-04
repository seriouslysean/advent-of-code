import fs from 'node:fs';

const file = fs.readFileSync('./input.txt', 'utf8');

/*
ROCK = 1
PAPER = 2
SCISSORS = 3
LOSE = 0
DRAW = 3
WIN = 6
*/

/*
C Y // SCISSOR vs PAPER, 2 + 0 = 2
C Z // SCISSOR vs SCISSOR, 3 + 3 = 6
B Z // PAPER vs SCISSOR, 3 + 6 = 9
// TOTAL = 17
*/

const moves = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
}

const isDraw = (round) => [
    'A X',
    'B Y',
    'C Z',
].includes(round);

const isWin = (round) => [
    'C X',
    'A Y',
    'B Z',
].includes(round);

// win, lose, draw
const shouldPlay = (move, result) => {
    console.log(move, result);
    switch (result) {
        // LOSE
        default:
        case 'X':
            if (move === 'A') return 'Z';
            if (move === 'B') return 'X';
            if (move === 'C') return 'Y';
            return
        // DRAW
        case 'Y':
            if (move === 'A') return 'X';
            if (move === 'B') return 'Y';
            if (move === 'C') return 'Z';
            return
        // WIN
        case 'Z':
            if (move === 'A') return 'Y';
            if (move === 'B') return 'Z';
            if (move === 'C') return 'X';
            return
    }
}

const { part1, part2 } = file.split("\n").reduce((acc, round) => {
    if (!round) return acc;

    // ['C Y'] = SCISSORS vs. PAPER
    const [opponentMove, playerMove] = round.split(' ');

    function calculateRound(r, pm) {
        if (isDraw(r)) {
            // DRAW
            return moves[pm] + 3;
        } else if (isWin(r)) {
            // WIN
            return moves[pm] + 6;
        } else {
            // LOST
            return moves[pm] + 0;
        }
    }

    // Part 1
    acc.part1 += calculateRound(round, playerMove);

    // Part 2
    const roundResult = playerMove;
    const newPlayerMove = shouldPlay(opponentMove, roundResult);
    acc.part2 += calculateRound(`${opponentMove} ${newPlayerMove}`, newPlayerMove);

    return acc;
}, {
    part1: 0,
    part2: 0,
});

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
