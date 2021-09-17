import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../core/MessageBox/MessageBox";
import LoadingBox from "../../core/LoadingBox/LoadingBox";
import useStyles from "./styles";
import { createMatricula, deleteMatricula, findMatricula } from "../../../actions/matriculaActions";
import { MATRICULA_CREATE_RESET, MATRICULA_DELETE_RESET } from "../../../constants/matriculaConstants";
import { Link,useHistory } from "react-router-dom";

function CursoActions(props) {
  const classes = useStyles();
  const history = useHistory()
  const [isMatriculado, setIsMatriculado] = useState(false);

  const alunoSignin = useSelector((state) => state.alunoSignin);
  const { alunoInfo: aluno } = alunoSignin;

  const cursoInfomations = useSelector((state) => state.cursoInfomations);
  const { data: {curso} } = cursoInfomations;

  const dispatch = useDispatch();
  const matriculaFind = useSelector((state) => state.matriculaFind);
  const { loading: loadingFind, error: errorFind, data } = matriculaFind;

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
  

  useEffect(()=>{
    if (aluno && curso) {
      dispatch({type:MATRICULA_DELETE_RESET})
      dispatch(findMatricula(aluno.aluno_id, curso.curso_id));
    }
  },[aluno, curso,dispatch])

  useEffect(()=>{
    if(successDelete){
      dispatch({type:MATRICULA_DELETE_RESET})
      setIsMatriculado(false)
    }
    if (dataCreate) {
      dispatch({type:MATRICULA_CREATE_RESET})
      history.push(`/aluno/app/curso/${curso.slug}/aulas`)
    }
  },[curso.slug, dataCreate, dispatch, history, successDelete])
  
  useEffect(()=>{
    if(data){
      setIsMatriculado(true)
    }else{
      setIsMatriculado(false)
    }
  },[data])

  const handleMatricula = ()=>{
    dispatch(createMatricula({aluno_id:aluno.aluno_id, curso_id:curso.curso_id}))
  }

  const handleDesmatricula = ()=>{
    dispatch(deleteMatricula({aluno_id:aluno.aluno_id, curso_id:curso.curso_id}))
  }

  return (
    <Grid container spacing={2}>
      {aluno && aluno.assinatura && Number(aluno.assinatura.plano_id) >= Number(curso.plano_id)? (
        loadingFind || loadingCreate || loadingDelete ? (
          <LoadingBox color="primary" />
        ) : errorFind ? (
          <MessageBox type="error">{errorFind}</MessageBox>
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
                component={Link}
                to={`/aluno/app/curso/${curso.slug}/aulas`}
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
