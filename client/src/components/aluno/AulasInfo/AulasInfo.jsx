import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";
import React from "react";
import useStyles from './styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function AulasInfo({ aulas }) {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      
      {aulas.map((aula,index) => (
        <Accordion key={index} className={classes.accordion}>
          <AccordionSummary 
            aria-controls="panel1d-content" 
            id="panel1d-header"
            expandIcon={<ExpandMoreIcon className={classes.icon} />}
            >
            <Typography  className={classes.heading}>Aula {index + 1}: {aula.nome}</Typography>
            <Typography className={classes.secondaryHeading}>{aula.duracao} min</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
                {aula.descricao}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default AulasInfo;
