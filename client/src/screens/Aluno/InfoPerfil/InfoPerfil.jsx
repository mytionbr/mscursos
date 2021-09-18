import { Box, Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { informationAluno } from "../../../actions/alunoActions";
import ToolbarPage from "../../../components/aluno/dashboard/ToolbarPage/ToolbarPage";
import AssinaturaCard from "../../../components/aluno/PerfilUpdate/AssinaturaCard/AssinaturaCard";
import PerfilUpdateForm from "../../../components/aluno/PerfilUpdate/PerfilUpdateForm/PerfilUpdateForm";
import LoadingBox from "../../../components/core/LoadingBox/LoadingBox";
import MessageBox from "../../../components/core/MessageBox/MessageBox";
import { ALUNO_UPDATE_RESET } from "../../../constants/alunoConstantes";

function InfoPerfil(props) {
  const alunoId = props.match.params.alunoId;

  const dispatch = useDispatch();
  const alunoInformations = useSelector((state) => state.alunoInformations);
  const {
    data: dataInfo,
    loading: loadingInfo,
    error: errorInfo,
  } = alunoInformations;

  useEffect(() => {
    dispatch({ type: ALUNO_UPDATE_RESET });
    dispatch(informationAluno(alunoId));
  }, [alunoId, dispatch]);

  return (
    <>
      <Helmet>
        <title> Dados | mscursos </title>
      </Helmet>
      <ToolbarPage title={"SEUS DADOS"} />
      <Box
        style={{
          backgroundColor: "inherit",
          minHeight: "100%",
          padding: "2rem 0",
        }}
      >
        <Container>
          <Grid
            container
            justifyContent={"space-evenly"}
            alignItems="stretch"
            spacing={3}
          >
            {loadingInfo ? (
              <LoadingBox />
            ) : errorInfo ? (
              <MessageBox type="error">{errorInfo}</MessageBox>
            ) : (
              <>
                <Grid item lg={8} sm={12}>
                  <PerfilUpdateForm />
                </Grid>
                <Grid item lg={4} sm={12}>
                  <AssinaturaCard />
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default InfoPerfil;
