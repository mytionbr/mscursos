import React, { useState } from "react";
import { Box, Container } from "@material-ui/core";
import { Helmet } from "react-helmet";
import CursoListResults from "../../../../components/professor/cursoList/CursoListResults/CursoListResults";
import { useHistory } from "react-router";
import ToolbarPage from "../../../../components/professor/ToolbarPage/ToolbarPage";
import FormCursoFilter from "../../../../components/professor/cursoList/FormCursoFilter/FormCursoFilter";
import ModalFilter from "../../../../components/professor/ModalFilter/ModalFilter";

function CursoList() {
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();

  const [nome, setNome] = useState("");
  const [categoriasTags, setCategoriasTags] = useState([]);

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
  
  const filter = <FormCursoFilter nome={nome} setNome={setNome} categoriasTags={categoriasTags} setCategoriasTags={setCategoriasTags} onModalClose={handleOpenModal}/>

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
      <ModalFilter 
        form={filter} 
        openModal={openModal} 
        onModalClose={handleOpenModal} />
    </>
  );
}

export default CursoList;
