import { Box, Container } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PerfilDetails from "../../../components/professor/PerfilDetails/PerfilDetails";
import ToolbarPage from "../../../components/professor/ToolbarPage/ToolbarPage";
function Perfil() {
    const history = useHistory()
    const links = [
        {
            name: "dashboard",
            href: "/professor/app/dashboard",
        },
        {
          name: "perfil",
          href: "/professor/app/perfil",
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
        <title>Perfil | mscursos</title>
      </Helmet>
      <Box
        style={{
          backgroundColor: "inherit",
          minHeight: "100%",
          padding: "3rem 0",
        }}
      >
        <Container maxWidth="lg">
          <ToolbarPage title={"Perfil"} links={links} btns={btns} />
          <PerfilDetails />
        </Container>
        </Box>
    </>
  );
}

export default Perfil;
