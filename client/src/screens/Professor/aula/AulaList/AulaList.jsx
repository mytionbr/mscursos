import { Box, Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { findCursosByProfessor } from "../../../../actions/cursoActions";
import LoadingBox from "../../../../components/core/LoadingBox/LoadingBox";
import MessageBox from "../../../../components/core/MessageBox/MessageBox";
import AulaListResult from "../../../../components/professor/aulaList/AulaListResult/AulaListResult";
import CursosTabs from "../../../../components/professor/aulaList/CursosTabs/CursosTabs";
import FormAulaFilter from "../../../../components/professor/aulaList/FormAulaFilter/FormAulaFilter";
import ModalFilter from "../../../../components/professor/ModalFilter/ModalFilter";
import ToolbarPage from "../../../../components/professor/ToolbarPage/ToolbarPage";

function AulaList() {
  const history = useHistory();
  
  const [openModal, setOpenModal] = useState(false);
  const [currentCurso, setCurrentCurso] = useState(null)

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleChangeCurso = (newValue) => {
    if(typeof newValue === 'object'){
      setCurrentCurso(newValue.target.value);
    } else {
      setCurrentCurso(newValue);
    }
    
  };

  const links = [
    {
      href: "/professor/app/dashboard",
      name: "Dashboard",
    },
    {
      href: "/professor/app/aulas",
      name: "Aulas",
    },
  ];

  const btns = [
    {
      name: "Criar nova Aula",
      action: () => history.push("/professor/app/aulas/novo"),
    },
    {
      name: "Filtrar",
      action: handleOpenModal,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Aulas | mscursos</title>
      </Helmet>
      <Box
        style={{
          backgroundColor: "inherit",
          minHeight: "100%",
          padding: "3rem 0",
        }}
      >
        <Container maxWidth={false}>
          <ToolbarPage title={"Aulas"} links={links} btns={btns} />
          <Grid container spacing={2}>
            <Grid item lg={4} sm={12} xl={4} xs={12}>
                  <CursosTabs currentCurso={currentCurso} handleChangeCurso={handleChangeCurso} />
            </Grid>
            <Grid item lg={8} sm={12} xl={8} xs={12}>
                <AulaListResult currentCurso={currentCurso} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ModalFilter form={FormAulaFilter} openModal={openModal} onModalClose={handleOpenModal} />

    </>
  );
}

export default AulaList;
