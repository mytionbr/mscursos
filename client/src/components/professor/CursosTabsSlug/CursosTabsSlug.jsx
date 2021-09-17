import { Card, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { findCursosByProfessor } from '../../../actions/cursoActions';
import LoadingBox from '../../core/LoadingBox/LoadingBox';
import MessageBox from '../../core/MessageBox/MessageBox';
import useStyles from "./styles";

function CursosTabsSlug({handleChangeSlug, currentSlug,...rest}) {
    const classes = useStyles();
    
    const dispatch = useDispatch();
    const cursoProfessor = useSelector((state) => state.cursoProfessor);
    const { loading, error, data } = cursoProfessor;
    const cursos = data ? data : [];
    
    useEffect(()=>{
      if(!currentSlug && cursos.length > 0){
        handleChangeSlug(cursos[0].slug)
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
        ) : cursos.length > 0 && currentSlug ? (
          <FormControl  color="secondary" variant="filled" className={classes.formControl}>
          <InputLabel id="cursos">Curso</InputLabel>
          <Select
            labelId="cursos"
            id="cursos"
            value={currentSlug}
            onChange={handleChangeSlug}
          >
            {cursos.map((item) => (
              <MenuItem value={item.slug}>{item.nome}</MenuItem>
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

export default CursosTabsSlug
