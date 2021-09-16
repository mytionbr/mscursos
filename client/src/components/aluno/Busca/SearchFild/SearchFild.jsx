import { Box, Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { findCursos } from "../../../../actions/alunoActions";
import useStyles from "./styles";
function SearchFild({query}) {
  const history = useHistory()
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
      history.push(`/aluno/app/busca/query?nome=${nome}`)
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
