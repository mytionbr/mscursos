import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    container:{
       display: 'flex',
       justifyContent: 'center',
    },
    card: {
       display: 'flex',
       padding: '0.5rem',
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       maxWidth: '26rem'
   },
   
}));
