import { Box, Container, Grid, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { findCursos } from '../../../actions/cursoActions'
import ToolbarPage from '../../../components/aluno/dashboard/ToolbarPage/ToolbarPage'
import CategoriaSelector from '../../../components/CategoriaSelector/CategoriaSelector'
import LoadingBox from '../../../components/core/LoadingBox/LoadingBox'
import MessageBox from '../../../components/core/MessageBox/MessageBox'
import Cursos from '../../../components/Cursos/Cursos'

function CursoList(props) {
    const localization = "/aluno/app"

    const dispatch = useDispatch()
    const cursoFind = useSelector((state) => state.cursoFind)
    const { loading, error, data } = cursoFind
    
    useEffect(()=>{
        dispatch(findCursos({
            nome: '',
            categorias: []
        }))
    },[dispatch])
    
    return (
        <>
            <Helmet>
                <title> Cursos | mscursos </title>
            </Helmet>
            <ToolbarPage title={"Cursos"} />
            <Box
            style={{
              minHeight: "100%",
              padding: "2rem 0",
            }}
          >            
            <Container>
                <Grid container spacing={2} justifyContent={'space-between'}>
                    <Grid item xs={3}>
                        <CategoriaSelector />
                    </Grid>
                    <Grid item xs={8}>
                        {
                            loading ? (
                                <LoadingBox />
                            ) : error ? (
                                <MessageBox type="error">
                                    {error}
                                </MessageBox>
                            ) : (<>
                            {
                                data.totalItems > 0 ? (
                                    <Typography variant="h5">Total ({ data.totalItems})</Typography>
                                ): (
                                    ''
                                )
                            }
                                <Cursos data={data} localization={localization} />
                                </>
                            ) 
                        }
                       
                    </Grid>
                </Grid>
            </Container>
          </Box>
        </>
    )
}

export default CursoList
