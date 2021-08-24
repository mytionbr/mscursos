import { Box, Container, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Helmet from "react-helmet";
import AulasInfo from "../../../components/aluno/AulasInfo/AulasInfo";
import CursoComments from "../../../components/aluno/CursoComments/CursoComments";
import CursoHeader from "../../../components/aluno/CursoHeader/CursoHeader";
import CursoStatistics from "../../../components/aluno/CursoStatistics/CursoStatistics";
import ProfessorInfo from "../../../components/aluno/ProfessorInfo/ProfessorInfo";

function CursoPage(props) {
  const currentCurso = props.match.params.cursoId;

  

  console.log(currentCurso);

  const [curso, setCurso] = useState({
    nome: "java",
    categoria: "programação",
    descricao:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    aulas: [
      {
        nome: "Introdução",
        descricao: "dfsoisjdfiojsiofjsiofjsiofjiofjsiofj",
        duracao: '10'
      },
      {
        nome: "Introdução",
        descricao: "dfsoisjdfiojsiofjsiofjsiofjiofjsiofj",
        duracao: '10'
      },
      {
        nome: "Introdução",
        descricao: "dfsoisjdfiojsiofjsiofjsiofjiofjsiofj",
        duracao: '10'
      },
    ],
    duracao: "10",
    atualizado: "02/06/21",
    alunos: 200,
    avaliacao: 5,
    progresso: 50,
    professor_nome: "João",
    professor_descricao: "Formado na USP",
    curso_id: 1,
  });

  const [aluno, setAluno] = useState({
    nome: "marcos",
    isMatriculado: true,
    progresso: "10",
  });

  return (
    <>
      <Helmet>
        <title> Curso | mscursos </title>
      </Helmet>
      <Box
        style={{
          minHeight: "100%",
        }}
      >
        <CursoHeader
          titulo={curso.nome}
          categoria={curso.categoria}
          descricao={curso.descricao}
          aluno={aluno}
        />
        <CursoStatistics
          aulas={curso.aulas}
          duracao={curso.duracao}
          alunos={curso.alunos}
          atualizado={curso.atualizado}
          avaliacao={curso.avaliacao}
          progresso={aluno.progresso}
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
              <Typography variant="body1" align="justify" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Grid>
            <Grid xs={3} item>
              <ProfessorInfo
                nome={curso.professor_nome}
                descricao={curso.professor_descricao}
              />
            </Grid>
            <Grid xs={8} item>
              <Typography variant="h5" gutterBottom>
                Aulas
              </Typography>
              <AulasInfo aulas={curso.aulas} />
            </Grid>
          </Grid>
          <CursoComments cursoId={curso.curso_id} />
        </Container>
      </Box>
    </>
  );
}

export default CursoPage;
