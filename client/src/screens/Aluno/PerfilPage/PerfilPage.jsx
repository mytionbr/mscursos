import { Box, Container, Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux';
import ToolbarPage from "../../../components/aluno/dashboard/ToolbarPage/ToolbarPage";
import PerfilHeader from '../../../components/aluno/Perfil/PerfilHeader/PerfilHeader';
import LoadingBox from '../../../components/core/LoadingBox/LoadingBox';
import MessageBox from '../../../components/core/MessageBox/MessageBox';

function PerfilPage(props) {
    const alunoId = props.match.params.alunoId

    const dispatch = useDispatch()
    const alunoInfomations = useSelector((state) => state.alunoInfomations);
    const { loading, error, data } = alunoInfomations;

    useEffect(() => {
        dispatch({type:ALUNO_INFORMATIONS_RESET})
        if(alunoId){
            dispatch(informationsAluno(alunoId));
        }
      }, [alunoId, dispatch]);
    

    return (
        <>
            <Helmet>
                <title> Pefil | mscursos </title>
            </Helmet>
            
                {
                    loading ? (
                        <LoadingBox />
                    ) : error ? (
                        <MessageBox type="error">
                            {error}
                        </MessageBox>
                    ) : data && (
                        <>
                            <ToolbarPage title={`PERFIL DE ${data.user.nome.toUpperCase()}`} />
                            <Box
                                style={{
                                minHeight: "100%",
                                padding: "2rem 0",
                                }}>
                                     <Container>
                                     <Grid
                                        container
                                        spacing={4}
                                        direction="column"
                                        justifyContent={"space-between"}
                                    >
                                         <Grid item xs="12">
                                            <PerfilHeader />
                                        </Grid>
                                        <Grid item xs="12">
                                            <PerfilStatistics />
                                        </Grid>
                                        <Grid item xs="12">
                                            <PerfilStatistics />
                                        </Grid>
                                        <Grid item xs="12">
                                            <PerfilCompletedCursos />
                                        </Grid>
                                    </Grid>
                                     </Container>
                            </Box>
                        </> 
                    )
                }
        </>
    )
}

export default PerfilPage
