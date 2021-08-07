import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    btns: {
        width: '100%',
        display: 'flex',
        justifyContent:'space-evenly'
    }
  }));