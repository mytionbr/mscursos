import { grey } from '@material-ui/core/colors'
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
  },
  boxContent:{
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  boxInformation:{
    display: 'flex',
    justifyContent: 'start',
    width: '45%',
    borderBottom: `1px solid #aca7a7`
  },
  labelInformation:{
    color: grey[700]
  },
  
   
}))