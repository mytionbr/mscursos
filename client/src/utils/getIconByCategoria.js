import {Code, DeveloperMode, FilterBAndW,PieChart,Translate,AllInclusive} from "@material-ui/icons/";

export function getIconByCategoria(categoriaId) {
    const categoria = Number(categoriaId)
    
    switch (categoria) {
        case 1:
            return (props) => <Code {...props}/>
        case 2:
            return (props) => <DeveloperMode  {...props}/>
        case 3:
            return (props) => <FilterBAndW  {...props}/>
        case 4:
            return (props) => <PieChart  {...props}/>
        case 5:
            return (props) => <Translate  {...props}/>
        case 6:
            return (props) => <AllInclusive  {...props}/>
        default:
            return (props) => <Code {...props}/>
      }
}