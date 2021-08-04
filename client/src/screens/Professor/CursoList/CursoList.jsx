import React from 'react'
import {Box, Container} from '@material-ui/core'
import { Helmet } from 'react-helmet'
import CursoListToobar from '../../../components/professor/cursoList/CursoListToobar/CursoListToolbar'
import CursoListResults from '../../../components/professor/cursoList/CursoListResults/CursoListResults'

function CursoList() {
    return (
        <>
            <Helmet>
                <title>Cursos | mscursos</title>
            </Helmet>
            <Box
                style={{
                    backgroundColor:'inherit',
                    minHeight:'100%',
                    padding: '3rem 0'
                }}
            >
                <Container maxWidth={false}> 
                    <CursoListToobar />
                    <Box style={{padding: '3rem 0'}}>
                        <CursoListResults cursos={cursos} />
                    </Box>
                </Container>
            </Box>  
        </>
    )
}

export default CursoList
