import { Box, Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { findCursos } from "../../../../actions/alunoActions";
import { useQuery } from "../../../../utils/hooks/useQuery";
import useStyles from "./styles";
function SearchFild({query}) {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const [nome, setNome] = useState("");

  useEffect(() => {
    if(query){
        setNome(query)
    }
  }, [dispatch, query]);

  const handleChangeNome = (event) => {
    const { value } = event.target;
    setNome(value);
  };

  const handleSubmit = (event)=>{
      event.preventDefault()

      dispatch( findCursos({
        nome: nome,
        categorias: [],
      }))
  }

  return (
    <form className={classes.rootContainer} onSubmit={handleSubmit}>
      <TextField
        fullWidth
        name="nome"
        onChange={handleChangeNome}
        required
        value={nome}
        variant="outlined"
        color="secondary"
      />
      <Button type="submit" color="secondary" variant="contained">
        Buscar
      </Button>
    </form>
  );
}

export default SearchFild;
