import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../core/MessageBox/MessageBox";
import LoadingBox from "../../core/LoadingBox/LoadingBox";
import useStyles from "./styles";
import { createMatricula, deleteMatricula, findMatricula } from "../../../actions/matriculaActions";
import { MATRICULA_CREATE_RESET, MATRICULA_DELETE_RESET, MATRICULA_FIND_RESET } from "../../../constants/matriculaConstants";

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

  const matriculaDelete = useSelector((state) => state.matriculaDelete);
  const { 
    loading: loadingDelete, 
    error: errorDelete, 
    success: successDelete } = matriculaDelete;
  
  console.log(cursoId)
  console.log( error, errorCreate, errorDelete)
 
  useEffect(()=>{
    if (aluno) {
      dispatch({type:MATRICULA_DELETE_RESET})
      dispatch(findMatricula(aluno.aluno_id, cursoId));
    }
  },[aluno, cursoId, dispatch])

  useEffect(()=>{
    if(successDelete){
      dispatch({type:MATRICULA_DELETE_RESET})
      setIsMatriculado(false)
    }
    if (dataCreate) {
      dispatch({type:MATRICULA_CREATE_RESET})
    }
  },[dataCreate, dispatch, successDelete])
  
  useEffect(()=>{
    if(data){
      setIsMatriculado(true)
    }else{
      setIsMatriculado(false)
    }
  },[data])

  const handleMatricula = ()=>{
    dispatch(createMatricula({aluno_id:aluno.aluno_id, curso_id:cursoId}))
  }

  const handleDesmatricula = ()=>{
    dispatch(deleteMatricula({aluno_id:aluno.aluno_id, curso_id:cursoId}))
  }

  return (
    <Grid container spacing={2}>
      {aluno && aluno.assinatura && aluno.assinatura.plano_id === planoId ? (
        loading || loadingCreate || loadingDelete ? (
          <LoadingBox color="primary" />
        ) : error ? (
          <MessageBox type="error">{error}</MessageBox>
        ) : errorCreate ? (
          <MessageBox type="error">{errorCreate}</MessageBox>
        ) : errorDelete ? (
          <MessageBox type="error">{errorDelete}</MessageBox>
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
                onClick={handleDesmatricula}
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
