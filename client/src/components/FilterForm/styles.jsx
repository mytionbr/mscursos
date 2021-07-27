import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
   root:{
       
   },
   paper:{
       padding: theme.spacing(2),

   },
   form:{
       display: 'flex',
       flexWrap:'wrap',
       justifyContent:'center',
       '& > *':{
         margin: '0.5rem 0'
        }
   }

   
}))