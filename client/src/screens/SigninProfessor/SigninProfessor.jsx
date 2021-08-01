import React from "react";
import {
  Container
} from "@material-ui/core";
import useStyles from "./styles";
import Signin from "../../components/Signin/Signin";

function SigninProfessor() {
  const classes = useStyles();

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <Signin />
    </Container>
  );
}

export default SigninProfessor;
