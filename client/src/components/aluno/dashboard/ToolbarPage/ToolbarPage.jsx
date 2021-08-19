import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";


function ToolbarPage({ title, ...rest }) {
  const classes = useStyles();
  return (
    <Box className={classes.boxContainer} {...rest}>
      <Container>
       <Typography variant="h4">{title}</Typography>
      </Container>
    </Box>
  );
}

export default ToolbarPage;
