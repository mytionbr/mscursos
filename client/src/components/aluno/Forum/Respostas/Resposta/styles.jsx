import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
   rootContainer: {
       display: 'flex',
       padding: '1rem'
   },
   insideColumn:{
       display: 'flex',
       flexColumn: 'column',
       alignContent: 'flex-start',
       '& > *':{
           margin: '1rem 0'
       },
       padding: '1rem'
   },
   feedback:{
    '& > svg':{
        color: '#aaa'
    }
   },
   corpo:{
       display: 'flex',
       flexColumn: 'column'
   },
   content:{
       padding: '1rem'
   },
   informations:{
       display: 'flex',
       width: '100%',
   },
   detailsContainer:{
       display: 'flex',
       flexDirection: 'column'
   },
   user:{
       display: 'flex',
   },
   avatarIcon:{
       padding: '1rem',
       '& > svg':{
           backgroundColor: theme.palette.secondary.main
       }
   }
}));
