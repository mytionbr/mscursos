import { Box, Container } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import FormCurso from "../../../components/professor/FormCurso/FormCurso";
import ToolbarPage from "../../../components/professor/ToolbarPage/ToolbarPage";
import { useHistory } from 'react-router-dom'

function CreateCurso() {
  
  const history = useHistory()
  
  const links = [
    {
      name: "dashboard",
      href: "/professor/app/dashboard",
    },
    {
      name: "cursos",
      href: "/professor/app/cursos",
    },
    {
      name: "novo curso",
      href: "/professor/app/cursos/novo",
    },
  ];

  const btns = [
    {
      name: "Voltar",
      action: ()=> history.push('/professor/app/cursos')
    },
  ];

  return (
    <>
      <Helmet>
        <title>Criar curso | mscursos</title>
      </Helmet>
      <Box
        style={{
          backgroundColor: "inherit",
          minHeight: "100%",
          padding: "3rem 0",
        }}
      >
        <Container maxWidth={false}>
          <ToolbarPage title={"Novo curso"} links={links} btns={btns} />
          <Box style={{ padding: "3rem 0" }}>
            <FormCurso />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CreateCurso;
