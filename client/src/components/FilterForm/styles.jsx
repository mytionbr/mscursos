import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
   root:{
       
   },
   paper:{
       padding: theme.spacing(2),
        position: '-webkit-sticky',
        position: 'sticky',
        top: 20,
        bottom: 20, 
        paddingTop: '40px',
        paddingBottom: '40px',
        zIndex: 5,
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