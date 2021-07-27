import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
    toolbar:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
    },
    brand:{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
    },
    brandIcon:{
        marginRight:'5px',
        color:'#506198',
        fontSize:'2.2rem'
    },
    navbarLink:{
        marginRight:'10px',
        borderRadius:'15px',
        "&:hover":{
                color: theme.palette.secondary.contrastText,
                boxShadow:'none'
            },
        border: '2px solid black',
        fontWeight:'700',
        boxShadow:'none'
        }
}))