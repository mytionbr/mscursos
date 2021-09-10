import { Box, Container } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import { useHistory } from 'react-router-dom'
import ToolbarPage from "../../../components/aluno/dashboard/ToolbarPage/ToolbarPage";
import CreateFormPost from "../../../components/aluno/Forum/CreateFormPost/CreateFormPost";

function CreatePost() {
  
  const history = useHistory()

  return (
    <>
      <Helmet>
        <title>Criar post | mscursos</title>
      </Helmet>
      <ToolbarPage title={"Novo Post"} />
      <Box
        style={{
          backgroundColor: "inherit",
          minHeight: "100%",
          padding: "1rem 0",
        }}
      >
        <Container >
          <Box style={{ padding: "1rem 0" }}>
            <CreateFormPost />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CreatePost;
