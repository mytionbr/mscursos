import React, { useEffect } from "react";
import { Box, Container } from "@material-ui/core";
import { Helmet } from "react-helmet";
import CursoListToobar from "../../../components/professor/cursoList/CursoListToobar/CursoListToolbar";
import CursoListResults from "../../../components/professor/cursoList/CursoListResults/CursoListResults";
import { useDispatch, useSelector } from "react-redux";
import { findCursos, findCursosByProfessor } from "../../../actions/cursoActions";
import LoadingBox from "../../../components/core/LoadingBox/LoadingBox";
import MessageBox from "../../../components/core/MessageBox/MessageBox";
import ModalFilter from "../../../components/professor/cursoList/ModalFilter/ModalFilter";

function CursoList() {
  const [openModal, setOpenModal] = useState(false)

  const dispatch = useDispatch();
  const cursoProfessor = useSelector((state) => state.cursoProfessor);
  const { loading, error, data } = cursoProfessor;
  const cursos = data ? data : []

  const handleOpenModal = ()=>{
    setOpenModal(!openModal)
}

  useEffect(() => {
    dispatch(
      findCursosByProfessor()
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
      <ModalFilter
                openModal={openModal}
                onModalClose={handleOpenModal}
       />
    </>
  );
}

export default CursoList;
