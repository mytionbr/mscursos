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
  button:{
    fontSize:'1.1rem'
  },
  inputLabel:{
    fontSize: '1.2rem',
    color: '#000'
  }

   
}))