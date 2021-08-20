import { Box, Chip, Container, Typography } from "@material-ui/core";
import React from "react";
import CursoActions from "../CursoActions/CursoActions";
import useStyles from "./styles";
function CursoHeader({titulo, categoria, descricao, aluno}) {
  const classes = useStyles();

  const handleCategoriaClick = () => {
    alert("oi");
  };

  return (
    <Box className={classes.container}> 
        <Chip label={categoria} onClick={handleCategoriaClick} />
        <Typography variant="h2" gutterBottom>
          {titulo}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
            {descricao}
        </Typography>
        <CursoActions aluno={aluno} />
    </Box>
  );
}

export default CursoHeader;
