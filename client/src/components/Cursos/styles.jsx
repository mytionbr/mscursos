import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
   row:{
       display:'flex',
       flexWrap: 'wrap',
       justifyContent: 'space-between',
       alignItems: 'center',
   },
   pagination:{
       margin: 'auto',
       marginTop:'0.5rem',
   }
}))