import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
   root:{
       
   },
   card: {
     width: '20rem',
     padding: '0;3rem',
   },
   content:{
     display: 'flex',
     justifyContent: 'space-evenly',
     alignItems:'center',
     flexDirection:'column'
   },
   header: {
     display: 'flex',
     flexDirection:'column',
     justifyContent: 'space-between',
     alignItems:'center',
     padding: '0.5rem',
     fontSize: '2rem'
   },
   headerIcon: {
     "& > svg": {
      fontSize: '5rem',
     color:theme.palette.secondary.main 
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
   buttonBox:{
     display: 'flex',
     justifyContent:'center',
     alignContent: 'center'
   },
   buttonEnroll:{
    borderRadius:'15px',
    fontSize:'1rem',
    padding:'0.2rem 3rem',
    "&:hover":{
            color: theme.palette.secondary.contrastText,
            boxShadow:'none'
        },
    border: '2px solid black',
    fontWeight:'700',
    boxShadow:'none'
    },
    hasIcon:{
      color:theme.palette.secondary.main,
    },
    notHasIcon:{
      color: grey[400]
    },
    headerPrice:{
      color: grey[600]
    }
}))