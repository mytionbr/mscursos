import { Button } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
function CursoActions({aluno}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {aluno && aluno.isMatriculado ? (
        <>
          <Button className={classes.button} variant="outlined" color="primary">
            Continuar
          </Button>
          <Button className={classes.button} variant="outlined" color="primary">
            Sair do curso
          </Button>
        </>
      ) : (
        <Button className={classes.button} variant="outlined" color="primary">
          Iniciar
        </Button>
      )}
    </div>
  );
}

export default CursoActions;
