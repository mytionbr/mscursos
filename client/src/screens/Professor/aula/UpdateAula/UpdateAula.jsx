import { Box, Container } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import ToolbarPage from "../../../../components/professor/ToolbarPage/ToolbarPage";
import { useHistory } from 'react-router-dom'
import UpdateFormAula from "../../../../components/professor/FormAula/UpdateFormAula/UpdateFormAula";

function UpdateAula(props) {
  const aulaId = props.match.params.aulaId;
  const cursoId = props.match.params.cursoId
  
  const history = useHistory()
  
  const links = [
    {
      name: "dashboard",
      href: "/professor/app/dashboard",
    },
    {
      name: "Aulas",
      href: "/professor/app/aulas",
    },
    {
      name: "Aula",
      href: `/professor/app/cursos/${cursoId}/aulas/${aulaId}`,
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
        <title>Aula | mscursos</title>
      </Helmet>
      <Box
        style={{
          backgroundColor: "inherit",
          minHeight: "100%",
          padding: "3rem 0",
        }}
      >
        <Container maxWidth={false}>
          <ToolbarPage title={"Aula"} links={links} btns={btns} />
          <Box style={{ padding: "3rem 0" }}>
            <UpdateFormAula cursoId={cursoId} aulaId={aulaId} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default UpdateAula;
