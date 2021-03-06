import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
   form:{
       padding: theme.spacing(2),
       display: 'flex',
       flexWrap:'wrap',
       justifyContent:'center',
       '& > *':{
         margin: '0.5rem 0'
        }
   },
   btnBack: {
     margin: '2rem'
   },
   avatar: {
     backgroundColor: theme.palette.primary.dark,
     '& > *':{
      color: '#fff',
     }
   },
   paper:{
    '& .MuiDrawer-paper': {
      width: '400px',
      boxSizing: 'border-box',
      [theme.breakpoints.down("xs")]: {
        width: '100%'
      },
    },
   
   }

   
}))