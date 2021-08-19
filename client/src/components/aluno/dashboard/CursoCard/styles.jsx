import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
    card:{
        width: '100%'
    },
    gridHeader:{
        width: '100%',
    },
    avatar:{
        backgroundColor: theme.palette.secondary.main,
        height: "4rem",
        width: "4rem",
    },
    gridPercent:{
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    percent:{
        root:{
            height: 10,
            borderRadius: 5,
        },
        colorPrimary:{
            backgroundColor: grey[400]
        },
        bar: {
            borderRadius: 5,
            backgroundColor: theme.palette.secondary.main,
          },
    }
}))