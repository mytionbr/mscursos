import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) =>({
   picture:{
       display: 'flex',
       alignItems: 'center',
       justifyContent:'center',
       height: '10rem',
   },
   pictureItem:{
       fontSize: '5rem',
       color:theme.palette.primary.dark, 
   },
   card:{
    maxWidth: '20rem',
    margin:'10px 0',
   }
}))