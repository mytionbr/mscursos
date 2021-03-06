import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
   rootContainer: {
       display: 'flex',
       padding: '1rem',
       justifyContent: 'center',
       alignItems: 'center',
       flexDirection: 'column',
       '& > *':{
            color: grey[700],
       }
   },
  
}));
