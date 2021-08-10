import { Box, Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { findCursosByProfessor } from "../../../../actions/cursoActions";
import LoadingBox from "../../../../components/core/LoadingBox/LoadingBox";
import MessageBox from "../../../../components/core/MessageBox/MessageBox";
import AulaListResult from "../../../../components/professor/aulaList/AulaListResult/AulaListResult";
import CursosTabs from "../../../../components/professor/CursosTabs/CursosTabs";
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

  const filter = <FormAulaFilter onModalClose={handleOpenModal} curso={currentCurso} />

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
          <Box style={{ padding: "1rem 0" }}>
            <CursosTabs currentCurso={currentCurso} handleChangeCurso={handleChangeCurso} />
            <AulaListResult currentCurso={currentCurso} />
          </Box>
        </Container>
      </Box>
      <ModalFilter
        openModal={openModal} 
        onModalClose={handleOpenModal} 
        form={filter} />
    </>
  );
}

export default AulaList;
