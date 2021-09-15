import { Card, Container, Fade } from "@material-ui/core";
import React from "react";
import PerfilHeader from "../PerfilHeader/PerfilHeader";
import PerfilStatistics from "../PerfilStatistics/PerfilStatistics";
import useStyles from "./styles";
function PerfilCard() {
  const classes = useStyles();
  return (
    <Fade appear={true} in={true} timeout={700}>
        <Container className={classes.container}>
        <Card className={classes.card}>
            <PerfilHeader />
            <PerfilStatistics />
        </Card>
        </Container>
    </Fade>
  );
}

export default PerfilCard;
