import { Box, Card, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../../core/LoadingBox/LoadingBox';
import MessageBox from '../../../core/MessageBox/MessageBox';
import ModalDelete from "../../ModalDelete/ModalDelete";
import MenuButton from "../../MenuButton/MenuButton"
import useStyles from './styles'
import PerfectScrollbar from "react-perfect-scrollbar";
import { deleteAula, findAulas } from '../../../../actions/aulaActions';
import { AULA_DELETE_RESET } from '../../../../constants/aulaConstantes';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function AulaListResult({currentCurso,...rest}) {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch();
  const aulasCurso = useSelector((state) => state.aulaFind);
  const { loading, error, data } = aulasCurso;
  const aulas = data ? data : [];
  console.log(currentCurso)
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
          curso: currentCurso,
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

  const handleModalEdit = (id) => {
    history.push(`/professor/app/aulas/${id}`)
}

const handleModalDelete = (id) => {
  setIdDelete(id)
  handleOpenModal()  
}


    return (
        <>
        {loading || loadingDelete ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox type="error">{error}</MessageBox>
        ) : errorDelete ?(
          <MessageBox type="error">{errorDelete}</MessageBox>
        ) : aulas.length === 0 ?(
          <MessageBox type="info">{'Sem aulas'}</MessageBox>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {aulas
                      .slice(page * limit, page * limit + limit)
                      .map((aula) => (
                        <TableRow hover key={aula.aula_id}>
                          <TableCell>{aula.aula_id}</TableCell>
                          <TableCell>
                            <Typography color="textPrimary" variant="body1">
                              {aula.nome}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {aula.descricao.length > 20
                              ? aula.descricao.slice(0, 20) + "..."
                              : aula.descricao}
                          </TableCell>
                          <TableCell>
                            <MenuButton
                              handleOpenModal={handleOpenModal}
                              setIdDelete={setIdDelete}
                              id={aula.aula_id}
                              handleEdit={handleModalEdit}
                              handleDelete={handleModalDelete}
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
              count={aulas.length}
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
