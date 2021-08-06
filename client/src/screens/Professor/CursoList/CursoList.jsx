import React, { useEffect, useState } from "react";
import { Box, Container } from "@material-ui/core";
import { Helmet } from "react-helmet";
import CursoListResults from "../../../components/professor/cursoList/CursoListResults/CursoListResults";
import { useDispatch, useSelector } from "react-redux";

import LoadingBox from "../../../components/core/LoadingBox/LoadingBox";
import MessageBox from "../../../components/core/MessageBox/MessageBox";
import ModalFilter from "../../../components/professor/cursoList/ModalFilter/ModalFilter";
import { useHistory } from "react-router";
import ToolbarPage from "../../../components/professor/ToolbarPage/ToolbarPage";

function CursoList() {
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

 

  const links = [
    {
      href: "/professor/app/dashboard",
      name: "Dashboard",
    },
    {
      href: "/professor/app/cursos",
      name: "Cursos",
    },
  ];

  const btns = [
    {
      name: "Criar novo Curso",
      action: () => history.push("/professor/app/cursos/novo"),
    },
    {
      name: "Filtrar",
      action: handleOpenModal,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Cursos | mscursos</title>
      </Helmet>
      <Box
        style={{
          backgroundColor: "inherit",
          minHeight: "100%",
          padding: "3rem 0",
        }}
      >
        <Container maxWidth={false}>
          <ToolbarPage title={"Cursos"} links={links} btns={btns} />

          <Box style={{ padding: "3rem 0" }}>
            <CursoListResults />
          </Box>
        </Container>
      </Box>
      <ModalFilter openModal={openModal} onModalClose={handleOpenModal} />
    </>
  );
}

export default CursoList;
