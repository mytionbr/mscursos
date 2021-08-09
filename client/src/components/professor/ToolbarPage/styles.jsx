import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
  boxContainer:{
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonAddCurso:{
    color: theme.palette.primary.dark,
    margin: '0 1rem',
  },
  link:{
    color:'#757575'
  }
   
}))