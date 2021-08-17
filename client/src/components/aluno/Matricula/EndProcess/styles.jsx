import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
   paper: {
     width: '100%',
     padding: theme.spacing(2),
     display: 'flex',
     justifyContent: 'space-evenly',
     alignItems:'center',
     flexDirection:'column',
   },
   icon:{
     fontSize:'6rem',
     color: theme.palette.secondary.main
   },
   button:{
     fontSize: '1rem',
     padding: theme.spacing(1),
     width: '100%',
     marginTop: theme.spacing(3)
   }

}))