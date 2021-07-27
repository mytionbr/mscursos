import { blueGrey, lightGreen } from '@material-ui/core/colors'
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
            main: '#b2ff59',
            dark: '#7ecb20',
            contrastText: '#FFF',
        },
        openTitle: blueGrey['400'],
        protectedTitle: lightGreen['400'],
        type: 'light'
    }
})

export default theme