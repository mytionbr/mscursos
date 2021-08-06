import { Box } from '@material-ui/core'
import React from 'react'
import { Helmet } from 'react-helmet'
import FormCurso from '../../../components/professor/FormCurso/FormCurso'
import ToolbarPage from '../../../components/professor/ToolbarPage/ToolbarPage'

function CreateCurso() {
    const links = [
        {
            name:"dashboard",
            href:'/professor/app/dashboard',
        },
        {
            name:"cursos",
            href:'/professor/app/cursos',
        },
        {
            name:'novo curso',
            href:'/professor/app/cursos/novo'
        }
    ]

    const btns = [
        {
            name:'Voltar'
        }
    ]
    
    return (
        <>
            <Helmet>
                <title>Criar curso | mscursos</title>
            </Helmet>
            <ToolbarPage
                title={'Novo curso'}
                links={links}
                btns={btns}
            />
            <Box
                style={{
                backgroundColor: "inherit",
                minHeight: "100%",
                padding: "3rem 0",
            }}>
                <FormCurso />
            </Box>
        </>
    )
}

export default CreateCurso
