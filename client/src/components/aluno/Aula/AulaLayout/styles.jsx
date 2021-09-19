import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  dashboardLayoutRoot: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    wigth: "100%",
  },
  dashboardLayoutWrapper: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    overflow: "hidden",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 310,
    },
  },
  dashboardLayoutContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  dashboardLayoutContent: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));
