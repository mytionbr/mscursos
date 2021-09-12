import { Box, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import ToolbarPage from "../../../components/aluno/dashboard/ToolbarPage/ToolbarPage";
import MainQuestion from "../../../components/aluno/Forum/MainQuestion/MainQuestion";
import Respostas from "../../../components/aluno/Forum/Respostas/Respostas";

function PostPage() {
  return (
    <>
      <Helmet>
        <title> Fórum | mscursos </title>
      </Helmet>
      <ToolbarPage title={"Fórum"} />
      <Box
        style={{
          minHeight: "100%",
          padding: "2rem 0",
        }}
      >
        <Container>
          <Grid 
            container
            spacing={1}
            direction="column"
            justifyContent={"space-between"}
            >
              <Grid item>
                <MainQuestion />
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  {respostas} respostas
                </Typography>
              </Grid>
              <Grid item>
                 <Respostas />   
              </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default PostPage;
