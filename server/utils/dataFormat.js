export default function (date){
    const pureDate = new Date(date)
    return (pureDate.getFullYear() + "-" + ((pureDate.getMonth() + 1)) + "-" + (pureDate.getDate() )) ;
}