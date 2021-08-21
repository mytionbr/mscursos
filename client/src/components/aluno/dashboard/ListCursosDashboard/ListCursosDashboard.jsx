import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core';
import useStyles from './styles'
import CursoCard from '../CursoCard/CursoCard';
function ListCursosDashboard(props) {
    const classes = useStyles()
    const { cursos } = props
    
    return (
        <div>
            <Accordion className={classes.details}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.icon} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>Todos os meus cursos</Typography>
            </AccordionSummary>
            <AccordionDetails >
                <Grid className={classes.grid} container spacing={1}>
                {
                    cursos.map(curso =>(
                        <Grid item xs={4}>
                        <CursoCard 
                        name={curso.name}
                        percent={curso.percent}
                        icon={curso.icon}
                        action={curso.action}
                    />
                    </Grid>
                    ))
                }
                </Grid>
            
            </AccordionDetails>
        </Accordion>
      </div>
    )
}

export default ListCursosDashboard
