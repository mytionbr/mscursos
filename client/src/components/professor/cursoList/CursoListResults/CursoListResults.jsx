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
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { findCursosByProfessor } from "../../../../actions/cursoActions";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";
import MessageBox from "../../../core/MessageBox/MessageBox";
import MenuButton from "../MenuButton/MenuButton";

function CursoListResults(props) {
  const dispatch = useDispatch();
  const cursoProfessor = useSelector((state) => state.cursoProfessor);
  const { loading, error, data } = cursoProfessor;
  const cursos = data ? data : [];

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(findCursosByProfessor());
  }, [dispatch]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox type="error">{error}</MessageBox>
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
                        <TableCell>{curso.descricao}</TableCell>
                        <TableCell>{curso.categoria_nome}</TableCell>
                        <TableCell>{curso.aulas}</TableCell>
                        <TableCell>{curso.alunos}</TableCell>
                        <TableCell>{curso.alunos}</TableCell>
                        <TableCell>
                          <MenuButton id={curso.curso_id} />
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
    </>
  );
}

export default CursoListResults;
