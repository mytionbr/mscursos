import { Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyle from './styles'

function ProfessorInfo({nome,descricao}) {
  
  const classes = useStyle()
  return (
    <Card>
       <CardHeader 
          title={nome}
          avatar={
            <Avatar className={classes.icon}>{nome[0].toUpperCase()}</Avatar>
          }
          subheader={'Professor(a) do curso'}
          classes={{
            title: classes.title,
            subheader: classes.subheader
          }}
        />
      <CardContent>
      <Typography variant="body1" gutterBottom>
                    {descricao}
                </Typography>
      </CardContent>
    </Card>
  );
}

export default ProfessorInfo;
