import { Box, Container } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import ToolbarPage from "../../../components/professor/ToolbarPage/ToolbarPage";
import { useHistory } from 'react-router-dom'
import CreateFormAula from "../../../../components/professor/FormAula/CreateFormAula/CreateFormAula";

function CreateAula() {
  
  const history = useHistory()
  
  const links = [
    {
      name: "dashboard",
      href: "/professor/app/dashboard",
    },
    {
      name: "aulas",
      href: "/professor/app/aulas",
    },
    {
      name: "novo aula",
      href: "/professor/app/aulas/novo",
    },
  ];

  const btns = [
    {
      name: "Voltar",
      action: ()=> history.push('/professor/app/aulas')
    },
  ];

  return (
    <>
      <Helmet>
        <title>Criar aula | mscursos</title>
      </Helmet>
      <Box
        style={{
          backgroundColor: "inherit",
          minHeight: "100%",
          padding: "3rem 0",
        }}
      >
        <Container maxWidth={false}>
          <ToolbarPage title={"Nova aula"} links={links} btns={btns} />
          <Box style={{ padding: "3rem 0" }}>
            <CreateFormAula />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CreateAula;
