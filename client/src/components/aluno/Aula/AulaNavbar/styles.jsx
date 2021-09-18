import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "#29292E",
    color: "#fff",
  },
  infoContainer: {
    display: "flex",
    width: "100%",
    padding: "0.3rem",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-end",
      textAlign: 'right',
      '& > *':{
          margin: '0.2rem 0'
      }
    },
  },
  title:{
    [theme.breakpoints.down("xs")]: {
        fontSize: '1rem'
      },
  }
}));
