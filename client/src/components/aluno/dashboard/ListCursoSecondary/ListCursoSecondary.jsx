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
                           name={curso.nome}
                           percent={curso.progresso}
                           size='tertiary'
                           categoriaId={curso.categoria_id}
                           slug={curso.slug}
                        />
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default ListCursoSecondary
