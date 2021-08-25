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
    width: '20rem',
    margin:'10px 0',
   },
   content:{
       minHeight:'10rem'
   },
   actions:{
        paddingLeft: '1rem'
   },
   link:{
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    fontSize:'1.1rem',
    '& > svg':{
        fontSize:'1.8rem'
    },
    display:'flex',
    alignItems: 'center'
   }
}))