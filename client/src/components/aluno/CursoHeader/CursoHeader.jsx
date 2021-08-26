import { Box, Chip, Container, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import CursoActions from "../CursoActions/CursoActions";
import useStyles from "./styles";
function CursoHeader({ titulo, categoria, descricao, aluno,cursoId,planoId,loading }) {
  const classes = useStyles();

  const handleCategoriaClick = () => {
    alert("oi");
  };

  return (
    <Box className={classes.box}>
      <Container className={classes.container}>
        <Box my={1}>
        {
          loading ? (
            <Skeleton variant="rect" width={'10rem'} height={20} />
          ) : (
            <Chip label={categoria} onClick={handleCategoriaClick} />
          )
        }
        </Box>
        <Box my={1}>
         {
          loading ? (
            <Skeleton variant="rect" width={'30rem'} height={118} />
          ) : (
            <Typography className={classes.title} variant="h1" >
              {titulo}
            </Typography>
          )}
        </Box> 
        <Box my={1}>
       {
          loading ? (
            <Skeleton variant="rect" width={'60rem'} height={50} />
          ) : (
            <Typography  align="center" variant="subtitle1" >
              {descricao}
            </Typography>
          )}
        </Box>
        <Box my={1}>
          <CursoActions aluno={aluno} cursoId={cursoId} planoId={planoId} />
        </Box>
      </Container>
      
    </Box>
  );
}

export default CursoHeader;
