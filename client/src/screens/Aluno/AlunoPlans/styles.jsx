import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  plansContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    width: '100%',
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent:"center",
      alignItems: 'center',
      "& > *":{
          margin: '0.5rem 0'
      }
    },
  },
}));
