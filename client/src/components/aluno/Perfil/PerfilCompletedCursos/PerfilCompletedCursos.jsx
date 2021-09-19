import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Fade,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CursoCard from "../../dashboard/CursoCard/CursoCard";
import { useSelector } from "react-redux";

function PerfilCompletedCursos() {
  const classes = useStyles();

  const alunoDetails = useSelector((state) => state.alunoDetails);
  const { data } = alunoDetails;

  return (
    <div>
      {data.cursos_completos.length ? (
      <Fade appear={true} in={true} timeout={700}>
        <Accordion className={classes.details}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.icon} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Cursos concluídos
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid className={classes.grid} container spacing={1}>
              {data.cursos_completos.map((curso) => (
                <Grid item xs={12} md={4}>
                  <CursoCard
                    name={curso.nome}
                    hasProgress={false}
                    size="secondary"
                    categoriaId={curso.categoria_id}
                    slug={curso.slug}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
        </Fade>
      ) : ('')}
    </div>
  );
}

export default PerfilCompletedCursos;
