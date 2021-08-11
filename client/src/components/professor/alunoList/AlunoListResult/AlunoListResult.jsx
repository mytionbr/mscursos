import { Box, Card, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import LoadingBox from '../../../core/LoadingBox/LoadingBox';
import MessageBox from '../../../core/MessageBox/MessageBox';
import PerfectScrollbar from "react-perfect-scrollbar";
import MenuButton from '../../MenuButton/MenuButton';
import { findAlunos } from '../../../../actions/alunoActions';

function AlunoListResult({currentCurso,...rest}) {
   
    const history = useHistory()
    const dispatch = useDispatch();
    const alunosCurso = useSelector((state) => state.alunoFind);
    const { loading, error, data } = alunosCurso;
    const alunos = data ? data : [];

  
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
  
    useEffect(() => {
      if(currentCurso){
        dispatch(
          findAlunos({
            curso: currentCurso,
            nome: '',
            email:'',
          })
        );
      }
  
    }, [currentCurso, dispatch]);
  
    const handleLimitChange = (event) => {
      setLimit(event.target.value);
    };
  
    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };
  
  const handleModalEdit = (id) => {
      history.push(`/professor/app/alunos/${currentCurso}/nota/${id}`)
  }

  const handleModalAdd = (id) => {
    history.push(`/professor/app/notas/novo`)
  }
  
  
      return (
          <>
          {loading  ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox type="error">{error}</MessageBox>
          ) : alunos.length === 0 ?(
            <MessageBox type="info">{'Sem Alunos'}</MessageBox>
          ) : currentCurso ? (
            <Card {...rest}>
              <PerfectScrollbar component="div">
                <Box style={{ minWidth: "1050px" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Nota</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {alunos
                        .slice(page * limit, page * limit + limit)
                        .map((aluno) => (
                          <TableRow hover key={aluno.aluno_id}>
                            <TableCell>{aluno.aluno_id}</TableCell>
                            <TableCell>
                              <Typography color="textPrimary" variant="body1">
                                {aluno.nome}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {aluno.email}
                            </TableCell>
                            {
                              aluno.nota ? (
                                <TableCell>
                                  {aluno.nota}
                                </TableCell>
                              ) : (
                                <TableCell>
                                  'Sem nota'
                                </TableCell>
                              )
                            }
                            <TableCell>
                              {
                                 aluno.nota ? (
                                    <MenuButton
                                      id={aluno.aluno_id}
                                      handleModalEdit={handleModalEdit}
                                      hasDeleteButton={false}
                                    />
                                 ) : (
                                    <MenuButton
                                      id={aluno.aluno_id}
                                      hasDeleteButton={false}
                                      hasEditButton={false}
                                      addButtonName={'Avalie'}
                                      handleModalAdd={handleModalAdd}
                                      hasAddButton={true}
                                  />
                                 )
                              }
                            
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={alunos.length}
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
        </>
      );
    }

export default AlunoListResult
