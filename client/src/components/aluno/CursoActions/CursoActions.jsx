import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../core/MessageBox/MessageBox";
import LoadingBox from "../../core/LoadingBox/LoadingBox";
import useStyles from "./styles";
import { createMatricula, findMatricula } from "../../../actions/matriculaActions";
import { MATRICULA_CREATE_RESET } from "../../../constants/cursoConstants copy";

function CursoActions({ aluno, planoId, cursoId }) {
  const classes = useStyles();
  const [isMatriculado, setIsMatriculado] = useState(false);

  const dispatch = useDispatch();
  const matriculaFind = useSelector((state) => state.matriculaFind);
  const { loading, error, data } = matriculaFind;

  const matriculaCreate = useSelector((state) => state.matriculaCreate);
  const { 
    loading: loadingCreate, 
    error: errorCreate, 
    data: dataCreate } = matriculaCreate;
  
  console.log(loading , loadingCreate )
  
  useEffect(() => {
    if (aluno) {
      dispatch(findMatricula(aluno.aluno_id, cursoId));
    }
  }, [aluno, cursoId, dispatch]);

  useEffect(() => {
    console.log(dataCreate,data)
    if (dataCreate) {
      dispatch({type:MATRICULA_CREATE_RESET})
    } 
    if (data) {
      dispatch({type:MATRICULA_CREATE_RESET})
      setIsMatriculado(true);
    }
  }, [data, dataCreate, dispatch]);
  

  const handleMatricula = ()=>{
    console.log(aluno.aluno_id,cursoId)
    dispatch(createMatricula({aluno_id:aluno.aluno_id, curso_id:cursoId}))
  }

  return (
    <Grid container spacing={2}>
      {aluno && aluno.assinatura && aluno.assinatura.plano_id === planoId ? (
        loading || loadingCreate ? (
          <LoadingBox color="primary" />
        ) : error ? (
          <MessageBox type="error">{error}</MessageBox>
        ) : errorCreate ? (
          <MessageBox type="error">{errorCreate}</MessageBox>
        ) : isMatriculado ? (
          <>
            <Grid item>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
              >
                Continuar
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
              >
                Sair do curso
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                onClick={handleMatricula}
              >
                Iniciar
              </Button>
            </Grid>
            <Grid item></Grid>
          </>
        )
      ) : (
        ""
      )}
    </Grid>
  );
}

export default CursoActions;
