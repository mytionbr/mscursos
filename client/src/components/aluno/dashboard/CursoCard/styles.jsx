import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  card: {
    width: "100%",
    cursor: 'pointer'
  },
  gridContainer: {
   justifyContent: 'center',
   alignItems: 'center'
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    height: "6rem",
    width: "6rem",
    "& > svg ": {
      fontSize: "3rem",
    },
  },
  gridPercent: {
    flexDirection: "column",
  },
  percent: {
    height: 10,
    borderRadius: 5,
  },
}));
