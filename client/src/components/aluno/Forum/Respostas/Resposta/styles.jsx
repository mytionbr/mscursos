import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
   rootContainer: {
       display: 'flex',
       padding: '0.5rem',
       margin: '1rem 0'
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
       flexDirection: 'column',
       width: '100%'
   },
   content:{
       padding: '0.5rem'
   },
   informations:{
       display: 'flex',
       alignItems: 'center',
       width: '100%',
       padding: '0.2rem',
       borderBottom: '0.1rem solid #aaa',
       '& > *':{
           margin: '0 0.2rem'
       }
   },
   user:{
       display: 'flex',
       alignItems: 'center',
       '& > *':{
        margin: '0 0.2rem'
       }
   },
   avatarIcon:{
       padding: '1rem',
       backgroundColor: theme.palette.secondary.main
   },
   solutionChip:{
       backgroundColor: '#39cf4d',
       color: '#fff'
   }
}));
