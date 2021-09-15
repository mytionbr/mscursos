import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  sticky: {
    position: "-webkit-sticky",
    position: "sticky",
    top: 20,
    bottom: 20,
    zIndex: 5,
  },
}));
