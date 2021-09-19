import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  listItem: {
    display: "flex",
    padding: "0.2rem 0.3rem",
    margin: 0,
  },
  button: {
    justifyContent: "flex-start",
    letterSpacing: 0,
    textTransform: "none",
    width: "100%",
    backgroundColor: "#212121",
    padding: "0.6rem",
    "&:hover": {
      opacity: "0.7",
    },
    borderRadius: 0,
  },
  title: {
    fontSize: "1.2rem",
  },
  icon: {
    marginRight: "0.3rem",
    color: "#1ab359",
    fontSize: "1.6rem",
  },
}));
