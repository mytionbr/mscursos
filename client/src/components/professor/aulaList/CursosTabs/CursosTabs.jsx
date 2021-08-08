import { Card, Tabs } from "@material-ui/core";
import React from "react";
import CursoTab from "../CursoTab/CursoTab";
import useStyles from "./styles";

function CursosTabs({cursos,handleChangeCurso, currentCurso,...rest}) {
  const classes = useStyles();

  return (
    <Card className={classes.card} {...rest}>
      <Tabs
        orientaion="vertinal"
        variant="scrollable"
        value={currentCurso.curso_id}
        onChange={handleChangeCurso}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {
            cursos.map((curso,key)=>
               <CursoTab value={curso.curso_id} key={key} index={key}>
                   curso.nome
               </CursoTab>
            )
        }
      </Tabs>
    </Card>
  );
}

export default CursosTabs;
