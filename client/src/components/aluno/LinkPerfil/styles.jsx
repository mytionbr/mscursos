import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  link:{
      textDecoration: 'none',
      color: theme.palette.secondary.main,
      "&:hover":{
        textDecoration: 'underline'
      }
  }
}));
