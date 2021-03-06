import { Box, Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import SearchCursoList from "../../../components/aluno/Busca/SearchCursoList/SearchCursoList";
import SearchFild from "../../../components/aluno/Busca/SearchFild/SearchFild";
import ToolbarPage from "../../../components/aluno/dashboard/ToolbarPage/ToolbarPage";
import LoadingBox from "../../../components/core/LoadingBox/LoadingBox";
import MessageBox from "../../../components/core/MessageBox/MessageBox";
import { useQuery } from "../../../utils/hooks/useQuery";
import { findCursos } from "../../../actions/cursoActions"

function SearchPage(props) {
  
  const query = useQuery().nome

  const dispatch = useDispatch();
  const cursoFind = useSelector((state) => state.cursoFind);
  const { loading, error, data } = cursoFind;
  
  useEffect(() => {
   
     dispatch(
        findCursos({
          nome: query,
          categorias: [],
        })
      );
    
  }, [dispatch, query]);

  return (
    <>
      <Helmet>
        <title> Busca | mscursos </title>
      </Helmet>
      <ToolbarPage title={`BUSCA`} />
      <Box
        style={{
          minHeight: "100%",
          padding: "2rem 0",
        }}
      >
        <Container>
        <Grid
              container
              spacing={4}
              direction="column"
              justifyContent={"space-between"}
            >
            <Grid item xs="12">
              <SearchFild query={query}/>
            </Grid>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox type="error">{error}</MessageBox>
          ) : (              
              <Grid item xs="12">
                <SearchCursoList />
              </Grid>
          )}
           </Grid>
        </Container>
      </Box>
    </>
  );
}

export default SearchPage;
