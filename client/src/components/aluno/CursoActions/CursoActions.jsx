import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../core/MessageBox/MessageBox";
import LoadingBox from "../../core/LoadingBox/LoadingBox";
import useStyles from "./styles";
import { matriculaCurso } from "../../../actions/cursoActions";

function CursoActions({aluno,planoId,cursoId}) {
  const classes = useStyles();
  const [isMatriculado,setIsMatriculado] = useState(false)

  const dispatch = useDispatch();
  const cursoMatricula = useSelector((state) => state.cursoMatricula);
  const { loading, error, data } = cursoMatricula;
  console.log(data,aluno,planoId,cursoId)
  useEffect(() => {
    if(aluno){
      dispatch(matriculaCurso(aluno.aluno_id, cursoId));
    }
  }, [aluno, cursoId, dispatch]);

  useEffect(() => {
    if(data){
      setIsMatriculado(true)
    }
  }, [ data, dispatch])
  
    return (
     <>
        {aluno && aluno.assinatura && aluno.assinatura.plano_id === planoId 
        ? loading ?(
          <LoadingBox  />
        ) : error ? (
          <MessageBox type='error'>
            {error}
          </MessageBox>
        ) : isMatriculado ? (
          <div className={classes.container}>
          <Button className={classes.button} variant="outlined" color="primary">
            Continuar
          </Button>
          <Button className={classes.button} variant="outlined" color="primary">
            Sair do curso
          </Button>
          </div>
        ) : (
          <Button className={classes.button} variant="outlined" color="primary">
            Iniciar
          </Button>
        ) : (
          ''
        )}
     </>
    );  
}

export default CursoActions;
