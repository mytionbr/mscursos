import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyle from './styles'

function ProfessorInfo({nome,descricao}) {
  console.log(nome,descricao)
  const classes = useStyle()
  return (
    <Card>
      <CardContent>
        <Grid container className={classes.container}>
            <Typography variant="h5" gutterBottom>
                Professor(a)
            </Typography>
            <Grid item className={classes.header}>
                <Avatar className={classes.orange}>{nome[0]}</Avatar>
                <Typography variant="h6" gutterBottom>
                    {nome}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" gutterBottom>
                    {descricao}
                </Typography>
            </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ProfessorInfo;
