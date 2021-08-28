import { Grid } from '@material-ui/core'
import React from 'react'
import CursoCard from '../CursoCard/CursoCard'

function ListCursoSecondary(props) {
    const { cursos } = props

    return (
        <Grid
            container
            spacing={1}
            {...props}
        >
            {
                cursos.map(curso =>(
                    <Grid item xs={6}>
                        <CursoCard 
                            name={curso.name}
                            percent={curso.percent}
                            icon={curso.icon}
                            action={curso.action}
                            size='tertiary'
                        />
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default ListCursoSecondary
