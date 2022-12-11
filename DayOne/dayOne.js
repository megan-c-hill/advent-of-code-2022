import {readDataIntoArray} from "../utils/file-utils.js";

const findHighestCalorieTotal = () => {
    const elfCalories = readDataIntoArray('./DayOne/DayOne.txt', false, '\n\n');
    const totalCalorieList = elfCalories.map((elf) => elf.split('\n').reduce((accum, item) => accum += Number(item), 0));
    const highestCaloriePerElf = Math.max(...totalCalorieList);

    console.log('partOneAnswer', highestCaloriePerElf);
};

const findThreeHighestCalorieTotals = () => {
    const elfCalories = readDataIntoArray('./DayOne/DayOne.txt', false, '\n\n');
    const totalCalorieList = elfCalories.map((elf) => elf.split('\n').reduce((accum, item) => accum += Number(item), 0));
    const sortedCalorieList = totalCalorieList.sort((a, b) => b - a);
    const topThreeTotal = sortedCalorieList[0] + sortedCalorieList[1] + sortedCalorieList[2];

    console.log('partTwoAnswer', topThreeTotal);
}

findHighestCalorieTotal();
findThreeHighestCalorieTotals();