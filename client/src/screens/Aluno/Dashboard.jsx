import { Box, Container, Grid } from "@material-ui/core";
import React from "react";
import Helmet from "react-helmet";
import CursoCard from "../../components/aluno/dashboard/CursoCard/CursoCard";
import ListCursosDashboard from "../../components/aluno/dashboard/ListCursosDashboard/ListCursosDashboard";
import ListCursoSecondary from "../../components/aluno/dashboard/ListCursoSecondary/ListCursoSecondary";
import ToolbarPage from "../../components/aluno/dashboard/ToolbarPage/ToolbarPage";
import {
  Code,
  DeveloperMode,
  FilterBAndW,
  PieChart,
  Translate,
  AllInclusive,
} from "@material-ui/icons/";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Dashboard() {
  const history = useHistory();
  const cursos = [
    {
      name: "Programação",
      icon: <DeveloperMode />,
      action: () => history.push("/aluno/app/"),
      percent: 20,
    },
    {
      name: "Programação",
      icon: <DeveloperMode />,
      action: () => history.push("/aluno/app/"),
      percent: 20,
    },
    {
      name: "Programação",
      icon: <DeveloperMode />,
      action: () => history.push("/aluno/app/"),
      percent: 20,
    },
    {
      name: "Programação",
      icon: <DeveloperMode />,
      action: () => history.push("/aluno/app/"),
      percent: 20,
    },
    {
      name: "Programação",
      icon: <DeveloperMode />,
      action: () => history.push("/aluno/app/"),
      percent: 20,
    },
    {
      name: "Programação",
      icon: <DeveloperMode />,
      action: () => history.push("/aluno/app/"),
      percent: 20,
    },
    {
      name: "Programação",
      icon: <DeveloperMode />,
      action: () => history.push("/aluno/app/"),
      percent: 20,
    },
    {
      name: "Programação",
      icon: <DeveloperMode />,
      action: () => history.push("/aluno/app/"),
      percent: 20,
    },
    {
      name: "Programação",
      icon: <DeveloperMode />,
      action: () => history.push("/aluno/app/"),
      percent: 20,
    },
  ];

  return (
    <>
      <Helmet>
        <title> Dashboard | mscursos </title>
      </Helmet>
      <ToolbarPage title={"Dashboard"} />
      <Box
        style={{
          minHeight: "100%",
          padding: "3rem 0",
        }}
      >
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={6} sm={12} xl={6} xs={12}>
              <CursoCard
                name={cursos[0].name}
                percent={cursos[0].parcent}
                icon={cursos[0].icon}
                action={cursos[0].action}
              />
            </Grid>
            <Grid
              item
              lg={6}
              sm={12}
              xl={6}
              xs={12}
              spacing={1}
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <ListCursoSecondary
                cursos={[].concat(cursos[0], cursos[0], cursos[0])}
              />
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <ListCursosDashboard cursos={cursos} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
