import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  link:{
      textDecoration: 'none',
      color: '#265DC9',
      "&:hover":{
        textDecoration: 'underline'
      }
  }
}));
