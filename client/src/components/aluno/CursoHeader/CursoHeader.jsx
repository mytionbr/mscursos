import { Box, Chip, Container, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { useSelector } from "react-redux";
import CursoActions from "../CursoActions/CursoActions";
import useStyles from "./styles";
function CursoHeader(props) {
  const classes = useStyles();

  const cursoInfomations = useSelector((state) => state.cursoInfomations);
  const { loading, data } = cursoInfomations;
  
  const curso = data && data.curso

  const handleCategoriaClick = () => {
    alert("oi");
  };

  return (
    <Box className={classes.box}>
      <Container className={classes.container}>
        <Box my={1} className={classes.boxWrapper}>
        {
          loading ? (
            <Skeleton variant="rect" style={{width: '100%'}} height={20} />
          ) : (
            <Chip label={curso.categoria_nome} onClick={handleCategoriaClick} />
          )
        }
        </Box>
        <Box my={1} className={classes.boxWrapper}>
         {
          loading ? (
            <Skeleton variant="rect" style={{width: '100%'}}  height={118} />
          ) : (
            <Typography className={classes.title} align="center" variant="h1" >
              {curso.nome}
            </Typography>
          )}
        </Box> 
        <Box my={1} className={classes.boxWrapper}>
       {
          loading ? (
            <Skeleton variant="rect" style={{width: '100%'}} height={50} />
          ) : (
            <Typography  align="center" variant="subtitle1" >
              {curso.descricao}
            </Typography>
          )}
        </Box>
        {
          loading ? (
            ''
          ) : (
            <Box my={1} >
              <CursoActions  />
          </Box>
          )
        }
      </Container>
      
    </Box>
  );
}

export default CursoHeader;
