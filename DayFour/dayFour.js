import {readDataIntoArray} from "../utils/file-utils.js";

const pairIsContained = (pairOne, pairTwo) => {
    const [pairOneMin, pairOneMax] = pairOne.split('-');
    const [pairTwoMin, pairTwoMax] = pairTwo.split('-');

    return Number(pairOneMin) <= Number(pairTwoMin) && Number(pairOneMax) >= Number(pairTwoMax);
}

const pairOverlaps = (pairOne, pairTwo) => {
    const [pairOneMin, pairOneMax] = pairOne.split('-');
    const [pairTwoMin, pairTwoMax] = pairTwo.split('-');

    return Number(pairOneMax) >= Number(pairTwoMin) && Number(pairOneMax) <= Number(pairTwoMax);
}

export const findDuplicates = () => {
    const pairings = readDataIntoArray('./DayFour/DayFour.txt', false, '\n');
    
    let duplicates = 0;
    
    pairings.forEach((pairingString) => {
        const [pairOne, pairTwo] = pairingString.split(',');

        if(pairIsContained(pairOne, pairTwo) || pairIsContained(pairTwo, pairOne)) {
            duplicates++
        }
    });

    console.log('partOneAnswer', duplicates);
}

const findOverlaps = () => {
    const pairings = readDataIntoArray('./DayFour/DayFour.txt', false, '\n');

    let overlaps = 0;

    pairings.forEach((pairingString) => {
        const [pairOne, pairTwo] = pairingString.split(',');

        if(pairOverlaps(pairOne, pairTwo) || pairOverlaps(pairTwo, pairOne)) {
            overlaps++
        }
    });

    console.log('partTwoAnswer', overlaps);
}

findDuplicates();
findOverlaps();