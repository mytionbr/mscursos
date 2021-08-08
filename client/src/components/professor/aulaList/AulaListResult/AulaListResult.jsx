import { Box, Card, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../../core/LoadingBox/LoadingBox';
import MessageBox from '../../../core/MessageBox/MessageBox';
import MenuButton from '../../cursoList/MenuButton/MenuButton';
import ModalDelete from '../../ModalDelete/ModalDelete';
import useStyles from './styles'
import PerfectScrollbar from "react-perfect-scrollbar";
import { deleteAula, findAulas } from '../../../../actions/aulaActions';
import { AULA_DELETE_RESET } from '../../../../constants/aulaConstantes';
function AulaListResult({currentCurso,...rest}) {
  const classes = useStyles()
    
  const dispatch = useDispatch();
  const aulasCurso = useSelector((state) => state.aulaFind);
  const { loading, error, data } = aulasCurso;
  const aulas = data ? data : [];

  const aulaDelete = useSelector((state) => state.aulaDelete);
  
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = aulaDelete;

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  const handleOpenModal = () => {    
    setOpen(!open);
  };

  const handleDelete = (aulaId,cursoId) => {
    dispatch(deleteAula(aulaId,cursoId));
  };

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: AULA_DELETE_RESET });
      setIdDelete(null);
    }
    if(currentCurso){
      dispatch(
        findAulas({
          curso: currentCurso.curso_id,
          nome: ''
        })
      );
    }

  }, [currentCurso, dispatch, successDelete]);

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
        ) : currentCurso ? (
          <Card {...rest}>
            <PerfectScrollbar component="div">
              <Box style={{ minWidth: "1050px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>Descrição</TableCell>
                      <TableCell>Alunos</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {aulas
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
                          <TableCell>{curso.alunos}</TableCell>
                          <TableCell>
                            <MenuButton
                              handleOpenModal={handleOpenModal}
                              setIdDelete={setIdDelete}
                              id={curso.curso_id}
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
        ): (
          <MessageBox type={'info'}>
            {'Selecione um curso'}
          </MessageBox>
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
  

export default AulaListResult
