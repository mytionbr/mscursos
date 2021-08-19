import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
  boxContainer:{
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '1rem',
    background: theme.palette.secondary.main,
    color:'#fff'
  },   
}))