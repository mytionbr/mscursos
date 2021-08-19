import { Grid } from '@material-ui/core'
import React from 'react'
import CursoCard from '../CursoCard/CursoCard'

function ListCursoSecondary(props) {
    const { cursos } = props

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            {...props}
        >
            {
                cursos.map(curso =>(
                    <CursoCard 
                        title={curso.name}
                        percent={curso.percentAulas}
                        icon={curso.icon}
                        action={curso.action}
                    />
                ))
            }
        </Grid>
    )
}

export default ListCursoSecondary
