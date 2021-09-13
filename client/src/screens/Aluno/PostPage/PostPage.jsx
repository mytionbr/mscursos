import { Box, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ToolbarPage from "../../../components/aluno/dashboard/ToolbarPage/ToolbarPage";
import MainQuestion from "../../../components/aluno/Forum/MainQuestion/MainQuestion";
import Respostas from "../../../components/aluno/Forum/Respostas/Respostas";
import { useDispatch, useSelector } from "react-redux";
import { informationsPost, listResponse } from "../../../actions/postActions";
import LoadingBox from "../../../components/core/LoadingBox/LoadingBox";
import MessageBox from "../../../components/core/MessageBox/MessageBox";
import RespostaForm from "../../../components/aluno/Forum/RespostaForm/RespostaForm";

function PostPage(props) {
  const postId = props.match.params.postId;

  const dispatch = useDispatch();
  const postInformations = useSelector((state) => state.postInformations);
  const {
    loading: loadingPost,
    error: errorPost,
    data: dataPost,
  } = postInformations;

  const postListResponse = useSelector((state) => state.postListResponse);
  const {
    loading: loadingResponse,
    error: errorResponse,
    data: dataResponse,
  } = postListResponse;

  useEffect(() => {
    dispatch(informationsPost(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    dispatch(listResponse(postId));
  }, [dispatch, postId]);

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
            {loadingPost ? (
              <LoadingBox />
            ) : errorPost ? (
              <MessageBox type="error">{errorPost}</MessageBox>
            ) : (
              dataPost && (
                <Grid item>
                  <MainQuestion />
                </Grid>
              )
            )}
            {loadingResponse ? (
              <LoadingBox />
            ) : errorPost ? (
              <MessageBox type="error">{errorPost}</MessageBox>
            ) : dataResponse && (
              <>
                <Grid item>
                  <Typography variant="h6">
                    {dataResponse.total_respostas} respostas
                  </Typography>
                </Grid>
                <Grid item>
                  <Respostas />
                </Grid>
              </>
            )}
               {loadingPost ? (
              <LoadingBox />
            ) : errorPost ? (
              <MessageBox type="error">{errorPost}</MessageBox>
            ) : (
              dataPost && (
                <Grid item>
                <RespostaForm />
              </Grid>
              )
            )}

           
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default PostPage;
