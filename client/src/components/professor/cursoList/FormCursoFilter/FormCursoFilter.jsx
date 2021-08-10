import { Button, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../../../core/LoadingBox/LoadingBox'
import MessageBox from '../../../core/MessageBox/MessageBox'
import useStyles from './styles'
import { listCategoria } from "../../../../actions/categoriaActions"
import { findCursosByProfessor } from '../../../../actions/cursoActions'
import Autocomplete from '@material-ui/lab/Autocomplete';

function FormCursoFilter({ onModalClose, openModal }) {
  const classes = useStyles()

  const dispatch = useDispatch();
  const categoriaList = useSelector((state) => state.categoriaList);
  const { loading, error, categorias } = categoriaList;

  const [nome, setNome] = useState("");
  const [categoriasTags, setCategoriasTags] = useState([]);

  useEffect(() => {
    dispatch(listCategoria());
  }, [dispatch]);

  const handleInput = (e) => {
    const { value } = e.target;

    setNome(value);
  };

  const handleInputCategorias = (event, newValue) => {
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

  const handleClear = () => {
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

  const handleSubmit = () => {
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
        onChange={handleInputCategorias}
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
        <div className={classes.form}>
          <Typography variant="h6">Filtre por um curso</Typography>
          <TextField
            name="nome"
            variant="outlined"
            label="Nome"
            color="secondary"
            fullWidth
            onChange={handleInput}
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
            onClick={handleSubmit}
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
            onClick={handleClear}
          >
            Limpar
          </Button>
        </div>
    )
}

export default FormCursoFilter
