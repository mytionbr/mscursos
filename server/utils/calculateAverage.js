export function calculateAverage(stars,total){
    for (const star in stars) {
        stars[`${star}`] = (stars[`${star}`]*100)/total
      }

    return stars
}