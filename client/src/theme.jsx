import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
    palette: {
        primary:{
            light: '#F1EFF6',
            main: '#FFF',
            dark: '#506198',
            contrastText: '#000',
        },
        secondary: {
            light: '#e08c0e',
            main: '#506198',
            dark: '#3d486b',
            contrastText: '#FFF',
        },
        background: {
            default: "#F1EFF6"
        }
       
    }
})

export default theme