import { Box, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";


function ToolbarPage({ title, ...rest }) {
  const classes = useStyles();
  return (
    <Box className={classes.boxContainer} {...rest}>
      <Typography variant="h4">{title}</Typography>
    </Box>
  );
}

export default ToolbarPage;
