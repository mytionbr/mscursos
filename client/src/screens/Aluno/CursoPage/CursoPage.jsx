import { Box, Container, Grid, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { informationsCurso } from "../../../actions/cursoActions";
import AulasInfo from "../../../components/aluno/AulasInfo/AulasInfo";
import CursoComments from "../../../components/aluno/CursoComments/CursoComments";
import CursoHeader from "../../../components/aluno/CursoHeader/CursoHeader";
import CursoStatistics from "../../../components/aluno/CursoStatistics/CursoStatistics";
import ProfessorInfo from "../../../components/aluno/ProfessorInfo/ProfessorInfo";
import Skeleton from '@material-ui/lab/Skeleton';
import MessageBox from "../../../components/core/MessageBox/MessageBox";

function CursoPage(props) {
  const slug = props.match.params.cursoId;

  const dispatch = useDispatch();
  const cursoInfomations = useSelector((state) => state.cursoInfomations);
  const { loading, error,  data } = cursoInfomations;
  
  console.log(data)
  useEffect(()=>{
      dispatch(informationsCurso(slug)); 
  },[dispatch, slug])
  
  const alunoSignin = useSelector((state)=> state.alunoSignin)
  const { alunoInfo } = alunoSignin
 

  return (
    <>
      <Helmet>
        <title> Curso | mscursos </title>
      </Helmet>
      {
        error ? (
          <MessageBox type="error">{'Erro ao carregar o curso'}</MessageBox>
        ) :  (
          <>
            <Box
        style={{
          minHeight: "100%",
        }}
      >
        <CursoHeader
          titulo={data && data.curso.nome}
          categoria={ data && data.curso.categoria_nome}
          descricao={ data && data.curso.descricao}
          aluno={alunoInfo}
          loading={loading}
        />
        <CursoStatistics
          aulasTotal={data && data.curso.aulas_total}
          duracao={data && data.curso.duracao}
          alunosTotal={data && data.curso.alunos_total}
          atualizado={data && moment(data.curso.data_atualizacao).format('L')}
          avaliacao={data && data.curso.avaliacao_media}
          loading={loading}
        />
        <Container>
          <Grid
            container
            spacing={3}
            style={{
              padding: "2rem 0",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid xs={8} item>
            <Typography variant="h5" gutterBottom>
                Resumo
              </Typography>
              {
                loading ? (
                  <Skeleton variant="rect" width={210} height={118} />
                ) : (
                  data.curso.resumo
                ) 
              }
             
            </Grid>
            <Grid xs={3} item>
            {
                loading ? (
                  <Skeleton variant="rect" width={210} height={118} />
                ) : (
                  <ProfessorInfo
                    nome={data.curso.professor_nome}
                    descricao={data.curso.professor_descricao}
                  />
                )}
             
            </Grid>
            <Grid xs={8} item>
              <Typography variant="h5" gutterBottom>
                Aulas
              </Typography>
              {
                loading ? (
                  <Skeleton variant="rect" width={210} height={118} />
                ) : (
                  <AulasInfo aulas={data.aulas} />
                )}  
            </Grid>
          </Grid>
          {
                loading ? (
                  <Skeleton variant="rect" width={210} height={118} />
                ) : (
                  <CursoComments curso={data.curso} avaliacoes={data.avaliacoes} stars={data.stars} />
                )}
        </Container>
      </Box>
          </>
        )
      }
      
    </>
  );
}

export default CursoPage;
