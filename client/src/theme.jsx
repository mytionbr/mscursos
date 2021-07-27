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
            light: '#e7ff8c',
            main: '#506198',
            dark: '#7ecb20',
            contrastText: '#FFF',
        },
        
        type: 'light'
    }
})

export default theme