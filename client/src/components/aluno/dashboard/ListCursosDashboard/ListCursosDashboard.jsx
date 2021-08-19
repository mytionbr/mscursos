import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import useStyles from './styles'
import CursoCardSimple from '../CursoCardSimple/CursoCardSimple';
function ListCursosDashboard(props) {
    const classes = useStyles()
    const { cursos } = props
    
    return (
        <div>
            <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>Todos os meus cursos</Typography>
            </AccordionSummary>
            <AccordionDetails>
            {
                    cursos.map(curso =>(
                        <CursoCardSimple 
                            name={curso.name}
                            icon={curso.icon}
                            action={curso.action}  />
                    ))
                }
            </AccordionDetails>
        </Accordion>
      </div>
    )
}

export default ListCursosDashboard
