import { Card, FormControl, InputLabel, MenuItem, Select, Tab, Tabs } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findCursosByProfessor } from "../../../../actions/cursoActions";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";
import MessageBox from "../../../core/MessageBox/MessageBox";
import useStyles from "./styles";

function CursosTabs({handleChangeCurso, currentCurso,...rest}) {
  const classes = useStyles();
  
  const dispatch = useDispatch();
  const cursoProfessor = useSelector((state) => state.cursoProfessor);
  const { loading, error, data } = cursoProfessor;
  const cursos = data ? data : [];
  
  useEffect(()=>{
    console.log('opa')
    if(!currentCurso && cursos.length > 0){
      handleChangeCurso(cursos[0].curso_id)
    }
  })

  useEffect(() => {
    dispatch(
      findCursosByProfessor({
        nome: "",
        categorias: [],
      })
    );
  }, [dispatch]);


  return (
    <Card className={classes.card} {...rest}>
    {
      loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox type="error">
          {error}
        </MessageBox>
      ) : cursos.length > 0 && currentCurso ? (
        <FormControl  color="secondary" variant="filled" className={classes.formControl}>
        <InputLabel id="cursos">Curso</InputLabel>
        <Select
          labelId="cursos"
          id="cursos"
          value={currentCurso}
          onChange={handleChangeCurso}
        >
          {cursos.map((item) => (
            <MenuItem value={item.curso_id}>{item.nome}</MenuItem>
          ))}
        </Select>
      </FormControl>      
      ) : (
        <div>Sem cursos</div>
      )
    }
   </Card>
  );
}

export default CursosTabs;
