import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
  boxContainer:{
    display: 'flex',
    flexDirection: 'column',
    padding:'1rem',
    '& > *':{
      margin: '0.5rem 0'
     }
  },
  buttonAddCurso:{
    color: theme.palette.primary.dark,
    margin: '0 1rem',
  }
   
}))