import { Avatar, Button, Drawer, IconButton, TextField, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategoria } from "../../../../actions/categoriaActions";
import { findCursos, findCursosByProfessor } from "../../../../actions/cursoActions";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";
import MessageBox from "../../../core/MessageBox/MessageBox";
import useStyles from './styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function ModalFilter({ onModalClose, openModal }) {
  const classes = useStyles()

  const dispatch = useDispatch();
  const categoriaList = useSelector((state) => state.categoriaList);
  const { loading, error, categorias } = categoriaList;

  const [nome, setNome] = useState("");
  const [categoriasTags, setCategoriasTags] = useState([]);

  useEffect(() => {
    dispatch(listCategoria());
  }, [dispatch]);

  const handlerInput = (e) => {
    const { value } = e.target;

    setNome(value);
  };

  const handlerInputCategorias = (event, newValue) => {
    if (typeof newValue === "string") {
      setCategoriasTags({ categoria: newValue });
    } else if (newValue && newValue.inputValue) {
      setCategoriasTags({
        categoria: newValue.inputValue,
      });
    } else {
      setCategoriasTags(newValue);
    }
  };

  const handlerClear = () => {
    dispatch(
      findCursosByProfessor({
        nome: "",
        categorias: [],
      })
    );
    setNome("");
    setCategoriasTags([]);
    onModalClose()
  };

  const handlerSubmit = () => {
    dispatch(
      findCursosByProfessor({
        nome: nome || "",
        categorias: categoriasTags || [],
      })
    );
    onModalClose()
  };

  const Categorias = () => {
    return (
      <Autocomplete
        multiple
        limitTags={2}
        fullWidth
        options={categorias}
        getOptionLabel={(option) => option.nome}
        onChange={handlerInputCategorias}
        value={categoriasTags}
        renderInput={(params) => (
          <TextField
            {...params}
            color="secondary"
            variant="outlined"
            label="categorias"
            placeholder="categorias"
          />
        )}
      />
    );
  };

  return (
    <>
      <Drawer
        anchor="right"
        onClose={onModalClose}
        open={openModal}
        variant="temporary"
        PaperProps={{
          style: {
            width: 400,
          },
        }}
      >
        <div className={classes.btnBack}>
            <Avatar className={classes.avatar}>
                <IconButton onClick={onModalClose}>
                    <ArrowBackIcon />
                </IconButton>
            </Avatar>
            
        </div>
        <div className={classes.form}>
          <Typography variant="h6">Filtre por um curso</Typography>
          <TextField
            name="nome"
            variant="outlined"
            label="Nome"
            color="secondary"
            fullWidth
            onChange={handlerInput}
            value={nome}
          />
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox type="error">{error}</MessageBox>
          ) : (
            <Categorias />
          )}

          <Button
            type="submit"
            className={classes.button}
            variant="outlined"
            color="secundary"
            size="large"
            onClick={handlerSubmit}
            fullWidth
          >
            Filtrar
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            color="secundary"
            size="large"
            type="large"
            fullWidth
            onClick={handlerClear}
          >
            Limpar
          </Button>
        </div>
      </Drawer>
    </>
  );
}

export default ModalFilter;
