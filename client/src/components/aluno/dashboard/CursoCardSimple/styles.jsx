import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
    card:{
        width: '100%'
    },
    gridContainer:{
        width: '100%',
    },
    avatar:{
        backgroundColor: theme.palette.secondary.main,
        height: "4rem",
        width: "4rem",
    },
}))