import {
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../../core/MessageBox/MessageBox";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";

import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import ModalDelete from "../../ModalDelete/ModalDelete";
import { deleteNota, detailsNota, updateNota } from "../../../../actions/alunoActions";
import { ALUNO_NOTA_DELETE_RESET, ALUNO_NOTA_UPDATE_RESET } from "../../../../constants/alunoConstantes";

function UpdateFormNota({notaId,...rest}) {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const notaDetails = useSelector((state) => state.notaDetails);
  const { loading, error,  data: nota } = notaDetails;

  const notaUpdate = useSelector((state) => state.notaUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = notaUpdate;

  const notaDelete = useSelector((state) => state.notaDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = notaDelete;

  

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: ALUNO_NOTA_DELETE_RESET });
      setIdDelete(null);
    }
    if (successUpdate) {
      dispatch({ type: ALUNO_NOTA_UPDATE_RESET });
      history.push("/professor/app/alunos");
    }
    if (!nota || nota.nota_id !== Number(notaId) || successUpdate) {
      dispatch({ type: ALUNO_NOTA_UPDATE_RESET });
      dispatch(detailsNota(notaId));
    } else {
      setValor(nota.valor)
      setAprovado(nota.aprovado)
    }
  }, [dispatch, history, nota, notaId, successDelete, successUpdate]);

  

  const [valor, setValor] = useState(0);
  const [aprovado, setAprovado] = useState(false);

  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  const handleOpenModal = () => {    
    setOpen(!open);
  };

  const handleChangeValor = (event) => {
    const value = event.target.value;
    setValor(value);
  };

  const handleChangeAprovado = (event) => {
    const value = nota > 6;
    setAprovado(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateNota({
        nota_id: notaId,
        valor: valor
      })
    );
  };

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(
      deleteNota({
        nota_id: notaId
      })
    );
  };

  return (
    <>
    <Card {...rest}>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <Box className={classes.boxContainer}>
          <Typography variant="h6">NOTA ID: {notaId}</Typography>
          <Divider/>
          <Typography variant="h6">ALUNO ID: {nota.aluno_id}</Typography>
          <Typography variant="h6">ALUNO NOME: {nota.aluno_nome}</Typography>
          <Divider/>
          <Typography variant="h6">CURSO ID: {nota.curso_id}</Typography>
          <Typography variant="h6">CURSO NOME: {nota.curso_nome}</Typography>
          <Divider/>
          <TextField
            name="nota"
            variant="outlined"
            label="Nota"
            color="secondary"
            fullWidth
            onChange={handleChangeValor}
            onBlur={handleChangeAprovado}
            value={valor}
          />
          <TextField
            name="nome"
            variant="outlined"
            multiline
            label="Descrição"
            color="secondary"
            fullWidth
            disabled={true}
            onChange={handleChangeAprovado}
            value={aprovado ? 'Aprovado' : 'Reprovado'}
          />

          <Button
            type="submit"
            className={classes.button}
            variant="outlined"
            color="secundary"
            size="large"
            onClick={handleSubmit}
            fullWidth
          >
            Salvar
          </Button>
          <Button
            type="submit"
            className={classes.button}
            variant="outlined"
            color="secundary"
            size="large"
            onClick={handleDelete}
            fullWidth
          >
            Deletar
          </Button>
          {loadingUpdate || loadingDelete ? (
            <LoadingBox />
          ) : errorUpdate  ? (
             <MessageBox type="error">{errorUpdate}</MessageBox>
          ) : errorDelete &&  (
             <MessageBox type="error">{errorDelete}</MessageBox>
          )}
        </Box>
         
      )
      }
    </Card>
    <ModalDelete
          handleDelete={handleDelete}
          setIdDelete={setIdDelete}
          idDelete={idDelete}
          open={open}
          handleOpenModal={handleOpenModal}
        />
    </>
  );
}

export default UpdateFormNota;
