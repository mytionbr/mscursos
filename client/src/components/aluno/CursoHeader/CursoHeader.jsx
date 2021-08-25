import { Box, Chip, Container, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import CursoActions from "../CursoActions/CursoActions";
import useStyles from "./styles";
function CursoHeader({ titulo, categoria, descricao, aluno,loading }) {
  const classes = useStyles();

  const handleCategoriaClick = () => {
    alert("oi");
  };

  return (
    <Box className={classes.box}>
      <Container className={classes.container}>
        {
          loading ? (
            <Skeleton variant="rect" width={210} height={118} />
          ) : (
            <Chip label={categoria} onClick={handleCategoriaClick} />
          )
        }
         {
          loading ? (
            <Skeleton variant="rect" width={210} height={118} />
          ) : (
            <Typography className={classes.title} variant="h1" gutterBottom>
              {titulo}
            </Typography>
          )}
       
       {
          loading ? (
            <Skeleton variant="rect" width={210} height={118} />
          ) : (
            <Typography  align="center" variant="subtitle1" gutterBottom>
              {descricao}
            </Typography>
          )}
        <CursoActions aluno={aluno} />
      </Container>
      
    </Box>
  );
}

export default CursoHeader;
