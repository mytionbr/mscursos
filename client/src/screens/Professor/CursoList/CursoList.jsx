import React, { useEffect } from "react";
import { Box, Container } from "@material-ui/core";
import { Helmet } from "react-helmet";
import CursoListToobar from "../../../components/professor/cursoList/CursoListToobar/CursoListToolbar";
import CursoListResults from "../../../components/professor/cursoList/CursoListResults/CursoListResults";
import { useDispatch, useSelector } from "react-redux";
import { findCursos } from "../../../actions/cursoActions";
import LoadingBox from "../../../components/core/LoadingBox/LoadingBox";
import MessageBox from "../../../components/core/MessageBox/MessageBox";

function CursoList() {
  const dispatch = useDispatch();
  const cursoFind = useSelector((state) => state.cursoFind);
  const { loading, error, data } = cursoFind;
  const cursos = data ? data.cursos : []

  useEffect(() => {
    dispatch(
      findCursos({
        nome: "",
        categorias: [],
      })
    );
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Cursos | mscursos</title>
      </Helmet>
      <Box
        style={{
          backgroundColor: "inherit",
          minHeight: "100%",
          padding: "3rem 0",
        }}
      >
        <Container maxWidth={false}>
          <CursoListToobar />
          <Box style={{ padding: "3rem 0" }}>
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox type="error">{error}</MessageBox>
            ) : (
              <CursoListResults cursos={cursos} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CursoList;
