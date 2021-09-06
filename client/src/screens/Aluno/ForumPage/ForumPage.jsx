import { Box, Button, Container, Grid } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import ToolbarPage from "../../../components/aluno/dashboard/ToolbarPage/ToolbarPage";
import PostFilter from "../../../components/aluno/Forum/PostFilter/PostFilter";

function ForumPage() {
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
            <Grid container spacing={4} direction="column" justifyContent={"space-between"}>
                <Grid item xs="12">
                    <PostFilter />
                </Grid>
                <Grid item xs="12">
                    <Button variant="contained" color="secondary" style={{fontSize: '1rem'}}>
                      Faça uma pergunta
                    </Button>
                </Grid>
                <Grid item xs="12">
                    <PostList />
                </Grid>
            </Grid>
        </Container>

      </Box>
    </>
  );
}

export default ForumPage;
