import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
  boxContainer:{
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down("xs")]: {
      flexDirection: 'column',
      "& > *":{
        margin: '0.2rem 0'
      }
    },
  },
  buttonAddCurso:{
    color: theme.palette.primary.dark,
    margin: '0 1rem',
  },
  link:{
    color:'#757575'
  },
   
}))