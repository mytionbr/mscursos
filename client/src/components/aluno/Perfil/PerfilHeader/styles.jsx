import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
   rootContainer: {
       display: 'flex',
       padding: '1rem',
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center'
   },
   avatar:{
    height: "6rem",
    width: "6rem",
    backgroundColor:theme.palette.secondary.main,
    "& > * ": {
      fontSize: "3rem",
    },
       
    }
}));
