import { Box, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import ToolbarPage from "../../../components/aluno/dashboard/ToolbarPage/ToolbarPage";
import MainQuestion from "../../../components/aluno/Forum/MainQuestion/MainQuestion";
import Respostas from "../../../components/aluno/Forum/Respostas/Respostas";
import { useDispatch, useSelector } from "react-redux";
import { informationsPost } from "../../../actions/postActions";
import LoadingBox from "../../../components/core/LoadingBox/LoadingBox";
import MessageBox from "../../../components/core/MessageBox/MessageBox";

function PostPage(props) {
  
  const postId = props.match.params.postId;
  
  const dispatch = useDispatch();
  const postInfomations = useSelector((state) => state.postInfomations);
  const { loading, error, data } = postInfomations;

  useEffect(() => {
    dispatch(informationsPost(postId));
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
              <Grid item>
                {
                  loading ? (
                    <LoadingBox />
                  ) : error ? (
                    <MessageBox type='error'>
                        {error}
                    </MessageBox>
                  ) : (
                    <MainQuestion />
                  )
                }
                
              </Grid>
              <Grid item>
              {
                  loading ? (
                    <LoadingBox />
                  ) : error ? (
                    <MessageBox type='error'>
                        {error}
                    </MessageBox>
                  ) : (
                    <Typography variant="h6">
                      {data.total_respostas} respostas
                    </Typography>
                  )
                }
              </Grid>
              <Grid item>
              {
                  loading ? (
                    <LoadingBox />
                  ) : error ? (
                    <MessageBox type='error'>
                        {error}
                    </MessageBox>
                  ) : (
                    <Respostas />   
                  )
                }
              </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default PostPage;
