import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  deleteCurso,
  findCursosByProfessor,
} from "../../../../actions/cursoActions";
import { CURSO_DELETE_RESET } from "../../../../constants/cursoConstants";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";
import MessageBox from "../../../core/MessageBox/MessageBox";
import ModalDelete from "../../ModalDelete/ModalDelete";
import MenuButton from "../../MenuButton/MenuButton"

function CursoListResults(props) {
  const history = useHistory()
  const dispatch = useDispatch();
  const cursoProfessor = useSelector((state) => state.cursoProfessor);
  const { loading, error, data } = cursoProfessor;
  const cursos = data ? data : [];

  const cursoDelete = useSelector((state) => state.cursoDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = cursoDelete;

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  const handleOpenModal = () => {    
    setOpen(!open);
  };

  const handleDelete = (id) => {
    dispatch(deleteCurso(id));
  };

const handleModalEdit = (id) => {
    history.push(`/professor/app/cursos/${id}`)
}

const handleModalDelete = (id) => {
  setIdDelete(id)
  handleOpenModal()  
}

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: CURSO_DELETE_RESET });
      setIdDelete(null);
    }
    dispatch(
      findCursosByProfessor({
        nome: "",
        categorias: [],
      })
    );
  }, [dispatch, successDelete]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {loading || loadingDelete ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox type="error">{error}</MessageBox>
      ) : errorDelete ?(
        <MessageBox type="error">{errorDelete}</MessageBox>
      ) : (
        <Card {...props}>
          <PerfectScrollbar component="div">
            <Box style={{ minWidth: "1050px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>categoria</TableCell>
                    <TableCell>Aulas</TableCell>
                    <TableCell>Alunos</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cursos
                    .slice(page * limit, page * limit + limit)
                    .map((curso) => (
                      <TableRow hover key={curso.curso_id}>
                        <TableCell>{curso.curso_id}</TableCell>
                        <TableCell>
                          <Typography color="textPrimary" variant="body1">
                            {curso.nome}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {curso.descricao.length > 20
                            ? curso.descricao.slice(0, 20) + "..."
                            : curso.descricao}
                        </TableCell>
                        <TableCell>{curso.categoria_nome}</TableCell>
                        <TableCell>{curso.aulas}</TableCell>
                        <TableCell>{curso.alunos}</TableCell>
                        <TableCell>
                          <MenuButton
                            handleOpenModal={handleOpenModal}
                            setIdDelete={setIdDelete}
                            id={curso.curso_id}
                            handleModalEdit={handleModalEdit}
                            handleModalDelete={handleModalDelete}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={cursos.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      )}
      <ModalDelete
        handleDelete={handleDelete}
        setIdDelete={setIdDelete}
        idDelete={idDelete}
        open={open}
        handleOpenModal={handleOpenModal}
      />
    </>
  );
}

export default CursoListResults;
