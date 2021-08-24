export function countOccurrences (arr){
     return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
}

