import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
   rootContainer: {
       display: 'flex',
       padding: '1rem',
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       borderBottom: '0.1rem solid #aaa'
   },
   avatar:{
    height: "6rem",
    width: "6rem",
    backgroundColor:theme.palette.secondary.main,
    "& > * ": {
      fontSize: "3rem",
    },
    },
    name:{
      color: grey[800],
    }
}));
