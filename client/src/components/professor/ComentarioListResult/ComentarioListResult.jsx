import { Card, Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import LoadingBox from '../../core/LoadingBox/LoadingBox';
import MessageBox from '../../core/MessageBox/MessageBox';
import PerfectScrollbar from "react-perfect-scrollbar";
import CursoComments from '../../aluno/CursoComments/CursoComments';
import { informationsCurso } from '../../../actions/cursoActions';

function ComentarioListResult({currentCurso,...rest}) {

  const dispatch = useDispatch();
  const cursoInfomations = useSelector((state) => state.cursoInfomations);
  const { loading, error, data } = cursoInfomations;

  useEffect(() => {
    dispatch(informationsCurso(currentCurso));
  }, [dispatch, currentCurso]);

    
    return (
        <>
        {loading  ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox type="error">{error}</MessageBox>
        ) : data.avaliacoes.length === 0 ?(
          <MessageBox type="info">{'Sem comentários'}</MessageBox>
        ) : currentCurso ? (
          <Card {...rest}>
            <PerfectScrollbar component="div" style={{padding: '0 1rem'}}>
              <CursoComments
                curso={data.curso}
                avaliacoes={data.avaliacoes}
                stars={data.stars}
              />
           </PerfectScrollbar>
          </Card>
        ): (
          <MessageBox type={'info'}>
            {'Selecione um curso'}
          </MessageBox>
        )}
      </>
    );
}

export default ComentarioListResult
