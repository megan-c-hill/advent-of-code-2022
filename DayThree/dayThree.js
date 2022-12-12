import {readDataIntoArray} from "../utils/file-utils.js";

const computeScoreForLetter = (letter) => {
    const asciiValue = letter.charCodeAt(0);

    if(letter.toUpperCase() === letter) {
        return asciiValue - 38;
    }

    return asciiValue - 96;
}

const computeRucksackScore = () => {
    const rucksacks = readDataIntoArray('./DayThree/DayThree.txt', false, '\n');

    const rucksackTotal = rucksacks.reduce((accum, runsack) => {
        const totalRucksackSize = runsack.length;
        const firstHalf = runsack.substring(0, totalRucksackSize / 2);
        const secondHalf = runsack.substring(totalRucksackSize / 2);

        let duplicateLetter = '';
        
        firstHalf.split('').forEach((char) => {
            if(secondHalf.indexOf(char) !== -1) {
                duplicateLetter = char;
            }
        });
        accum += computeScoreForLetter(duplicateLetter);

        return accum;
    }, 0);

    console.log('partOneAnswer', rucksackTotal);
};

const findPriorityValue = () => {
    const rucksacks = readDataIntoArray('./DayThree/DayThree.txt', false, '\n');
    let accum = 0;

    for(let rucksackIndex = 0; rucksackIndex < rucksacks.length; rucksackIndex += 3) {
        const rucksackOne = rucksacks[rucksackIndex];
        const rucksackTwo = rucksacks[rucksackIndex + 1];
        const rucksackThree = rucksacks[rucksackIndex + 2];
        let duplicatedLetter = '';

        rucksackOne.split('').forEach((char) => {
            if(rucksackTwo.indexOf(char) !== -1 && rucksackThree.indexOf(char) !== -1) {
                duplicatedLetter = char;
            }
        });

        accum += computeScoreForLetter(duplicatedLetter);
    }

    console.log('partTwoAnswer', accum);
}

computeRucksackScore();
findPriorityValue();