import React, { useEffect } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import ActionCardResource from "../../components/ActionCardResource/ActionCardResource";
import TotalAssignment from "../../components/professor/dashboard/TotalAssignment/TotalAssignment";
import { blue, green, red } from "@material-ui/core/colors";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import ClassIcon from "@material-ui/icons/Class";
import { useDispatch, useSelector } from "react-redux";
import { findAssignments } from "../../actions/professorActions";
import MessageBox from "../../components/core/MessageBox/MessageBox";
import { Helmet } from "react-helmet";
import { useHistory } from 'react-router-dom'

function Dashboard() {
  const professorSignin = useSelector((state) => state.professorSignin);
  const { professorInfo } = professorSignin;
  const professorAsseg = useSelector((state) => state.professorAssignments);
  const { loading, error, professorAssignments } = professorAsseg;
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    if (!professorAssignments) {
      dispatch(findAssignments(professorInfo.professor_id));
    }
  }, [dispatch, professorAssignments, professorInfo.professor_id]);

  const items = {
    alunos: {
      title: "Meus Alunos",
      count: professorAssignments ? professorAssignments.totalAlunos.count : "",
      loading: loading,
      color: green[600],
      icon: <PeopleOutlineIcon />,
    },
    cursos: {
      title: "Meus Cursos",
      count: professorAssignments ? professorAssignments.totalCursos.count : "",
      loading: loading,
      color: blue[600],
      icon: <CollectionsBookmarkIcon />,
    },
    aulas: {
      title: "Minhas Aulas",
      count: professorAssignments ? professorAssignments.totalAulas.count : "",
      loading: loading,
      color: red[600],
      icon: <ClassIcon />,
    },
  };

  return (
    <>
      <Helmet>
        <title> Dashboard | mscursos </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid container spacing={3}>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                {error ? (
                  <MessageBox type="error">{error}</MessageBox>
                ) : (
                  <TotalAssignment
                    loading={items.cursos.loading}
                    title={items.cursos.title}
                    count={items.cursos.count}
                    color={items.cursos.color}
                    icon={items.cursos.icon}
                  />
                )}
              </Grid>

              <Grid item lg={4} sm={6} xl={4} xs={12}>
                {error ? (
                  <MessageBox type="error">{error}</MessageBox>
                ) : (
                  <TotalAssignment
                    loading={items.alunos.loading}
                    title={items.alunos.title}
                    count={items.alunos.count}
                    color={items.alunos.color}
                    icon={items.alunos.icon}
                  />
                )}
              </Grid>

              <Grid item lg={4} sm={6} xl={3} xs={12}>
                {error ? (
                  <MessageBox type="error">{error}</MessageBox>
                ) : (
                  <TotalAssignment
                    loading={items.aulas.loading}
                    title={items.aulas.title}
                    count={items.aulas.count}
                    color={items.aulas.color}
                    icon={items.aulas.icon}
                  />
                )}
              </Grid>
            </Grid>
            <Grid item lg={4} sm={6} xl={3} xs={12}>
              <ActionCardResource
                resource={{
                  name: "Novo Curso",
                  description: "Crie um novo curso",
                }}
                action={()=>history.push('/professor/app/cursos/novo ')}
              />
            </Grid>

            <Grid item lg={4} sm={6} xl={3} xs={12}>
              <ActionCardResource
                resource={{
                  name: "Nova Aula",
                  description: "Prepare uma nova aula",
                }}
                
              />
            </Grid>
            <Grid item lg={4} sm={6} xl={3} xs={12}>
              <ActionCardResource
                resource={{
                  name: "Nova nota",
                  description: "Avalie seus alunos",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
