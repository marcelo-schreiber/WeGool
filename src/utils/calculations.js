import convertDate from "./convertDate";

export function mean(sum, size) {
  // get's last 2 decimal places (toFixed) and removes 0 at the right (parseFloat)
  // stackoverflow: remove-insignificant-trailing-zeros-from-a-number
  return parseFloat((sum / size).toFixed(2));
}

export function sortByGrade(gradesArray) {
  return gradesArray.sort((a, b) => a.nota - b.nota);
}

export function sortByDate(dateArray) {
  return dateArray.sort((a, b) => {
    return new Date(convertDate(a.envio) - new Date(convertDate(b.envio)));
  });
}

export function varianceAndDeviation(gradesArray, mean) {
  const size = gradesArray.length;
  const upperSideOfVariance = gradesArray.reduce(
    (total, curr) => (total += (mean - curr.nota) ** 2),
    0
  );

  const variance = (upperSideOfVariance.toFixed(2) / size).toFixed(2);
  const deviation = Math.sqrt(variance).toFixed(2);

  return { variance, deviation };
}

export function sumGrades(numArray) {
  return numArray.reduce((total, curr) => (total += curr.nota), 0);
}

export function movingAverage(sortedNumArray, howManyItems) {
  if (sortedNumArray.length === 0) return;
  const lastItemIdx = sortedNumArray.length - 1;
  let sum = 0;

  for (let i = 0; i < howManyItems; i++) {
    sum += sortedNumArray[lastItemIdx - i]?.nota;
  }

  return parseFloat((sum / howManyItems).toFixed(2));
}
