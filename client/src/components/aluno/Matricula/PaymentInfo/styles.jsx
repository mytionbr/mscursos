import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
   card: {
     width: '100%',
     padding: theme.spacing(1),
      position: '-webkit-sticky',
      position: 'sticky',
      top: 20,
      bottom: 20,
      zIndex: 5,
   },
   content:{
    display: 'flex',
     justifyContent: 'space-evenly',
     alignItems:'center',
     flexDirection:'column',
   },
   header: {
     "& > *":{
       textAlign: 'center',
       color:grey[700],
     },
     
   },
   listAdvantages: {
    listStyleType: 'none', 
    width: '100%',
   },
   advantage:{
     display: 'flex',
     flex: '1 1 auto',
     fontSize: '1.3rem',
     height: '2rem',
     alignItems: 'center',
     "& > span": {
      marginRight:'1rem',
     }
   },
   plan:{
    fontWeight: '700',
    color:theme.palette.secondary.main
   },
   price:{
    color:grey[700]
   },
   hasIcon:{
    color:theme.palette.secondary.main,
  },
  icon:{
    fontSize:'2rem'
  },
   notHasIcon:{
    color: grey[400]
  },
}))