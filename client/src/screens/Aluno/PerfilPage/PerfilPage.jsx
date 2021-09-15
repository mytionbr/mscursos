import { Box, Container, Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux';
import { detailsAluno } from '../../../actions/alunoActions';
import ToolbarPage from "../../../components/aluno/dashboard/ToolbarPage/ToolbarPage";
import PerfilCard from '../../../components/aluno/Perfil/PerfilCard/PerfilCard';
import PerfilCompletedCursos from '../../../components/aluno/Perfil/PerfilCompletedCursos/PerfilCompletedCursos';
import LoadingBox from '../../../components/core/LoadingBox/LoadingBox';
import MessageBox from '../../../components/core/MessageBox/MessageBox';
import { ALUNO_DETAILS_RESET } from '../../../constants/alunoConstantes';

function PerfilPage(props) {
    const alunoId = props.match.params.alunoId

    const dispatch = useDispatch()
    const alunoDetails = useSelector((state) => state.alunoDetails);
    const { loading, error, data } = alunoDetails;

    useEffect(() => {
        dispatch({type:ALUNO_DETAILS_RESET})
        if(alunoId){
            dispatch(detailsAluno(alunoId));
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
                            <ToolbarPage title={`PERFIL DE ${data.aluno.nome.toUpperCase()}`} />
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
                                             <PerfilCard />
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
