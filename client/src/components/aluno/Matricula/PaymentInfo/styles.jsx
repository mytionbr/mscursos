import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
   card: {
     width: '20rem',
     display: 'flex',
     justifyContent: 'space-evenly',
     alignItems:'center',
     flexDirection:'column',
     padding: theme.spacing(2),
      position: '-webkit-sticky',
      position: 'sticky',
      top: 20,
      bottom: 20, 
      paddingTop: '40px',
      paddingBottom: '40px',
      zIndex: 5,
   },
   header: {
     "& > *":{
       fontWeight: '700'
     }
   },
   listAdvantages: {
    listStyleType: 'none', 
    width: '100%',
   },
   advantage:{
     display: 'flex',
     flex: '1 1 auto',
     fontSize: '1rem',
     height: '2rem',
     alignItems: 'center',
     "& > span": {
      marginRight:'1rem',
     }
   },
   plan:{
    fontWeight: '700'
   },
   price:{
    color:grey[700]
   },
   notHasIcon:{
    color: grey[400]
  },
}))