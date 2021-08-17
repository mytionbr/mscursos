export function formatMonetaryValue (value){
    return `R$${value.replace('.',',')}`
}