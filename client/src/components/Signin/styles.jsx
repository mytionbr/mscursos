import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
    paper:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding:  theme.spacing(4),
    },
    avatar:{
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },

   
}))