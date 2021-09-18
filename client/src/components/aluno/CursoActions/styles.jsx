import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container:{
    display: "flex",
    [theme.breakpoints.down('xs')]:{
      flexDirection: 'column',
      alignItems: 'center'
   },
  },
  button:{
    fontSize: '1.5rem',
    color: '#fff'
}
}));
