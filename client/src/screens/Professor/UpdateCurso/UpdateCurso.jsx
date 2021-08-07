import { Box, Container } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import ToolbarPage from "../../../components/professor/ToolbarPage/ToolbarPage";
import { useHistory } from 'react-router-dom'
import UpdateFormCurso from "../../../components/professor/FormCurso/UpdateFormCurso/UpdateFormCurso";

function UpdateCurso(props) {
  const cursoId = props.match.params.cursoId;
  const history = useHistory()
  console.log(cursoId)
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
      name: "curso",
      href: `/professor/app/cursos/${cursoId}`,
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
        <title>Curso | mscursos</title>
      </Helmet>
      <Box
        style={{
          backgroundColor: "inherit",
          minHeight: "100%",
          padding: "3rem 0",
        }}
      >
        <Container maxWidth={false}>
          <ToolbarPage title={"Curso"} links={links} btns={btns} />
          <Box style={{ padding: "3rem 0" }}>
            <UpdateFormCurso cursoId={cursoId} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default UpdateCurso;
