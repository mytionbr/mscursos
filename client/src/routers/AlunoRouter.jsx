import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../components/core/Navbar/Navbar";
import AlunoPlans from "../screens/Aluno/AlunoPlans/AlunoPlans";
import Home from "../screens/Aluno/Home";
import RegisterInfoMatricula from "../screens/Aluno/Matricula/RegisterInfoMatricula";
import SigninAluno from "../screens/Aluno/SigninAluno/SigninAluno";
import DashboardLayout from "../components/aluno/dashboard/DashboardLayout/DashboardLayout";
import AlunoRoute from "../components/aluno/AlunoRoute";
import Dashboard from "../screens/Aluno/Dashboard";
import CursoPage from "../screens/Aluno/CursoPage/CursoPage";
import CursoList from "../screens/Aluno/CursoList/CursoList";
import AulaLayout from "../components/aluno/Aula/AulaLayout/AulaLayout";
import AulaPage from "../screens/Aluno/AulaPage/AulaPage";
const AlunoRouter = () => {
  
  const appRoutes = () => {
    return (
      <DashboardLayout>
        <Switch>
          <AlunoRoute path={"/aluno/app/cursos/"} component={CursoList} />
          <AlunoRoute path={"/aluno/app/curso/:cursoSlug"} component={CursoPage} />
          <AlunoRoute path={"/aluno/app"} component={Dashboard} />
        </Switch>
      </DashboardLayout>
    );
  };

  const aulaRoutes = (props)=>{
   
    return (
      <AulaLayout {...props}>
        <Switch>
          <AlunoRoute path={[
            "/aluno/app/curso/:cursoSlug/aulas/:aulaId",
            "/aluno/app/curso/:cursoSlug/aulas/"]} component={AulaPage} />
        </Switch>
      </AulaLayout>
    )
  }

  const homeRoutes = () =>{
    return (
      <div>
      <Navbar />
      <Switch>
       <Route exact path="/aluno/signin" component={SigninAluno} />
       <Route exact path="/aluno/matriculas" component={AlunoPlans} />
       <Route path="/curso/:cursoSlug" component={CursoPage} />
       <Route exact path="/" component={Home} />
       <Route
         path="/aluno/matriculas/compra/:plano"
         component={RegisterInfoMatricula}
       />
     </Switch>
     </div>
    )
  }

  return (
    <div>
      <Switch>
        <AlunoRoute path={"/aluno/app/curso/:cursoSlug/aulas/"} component={aulaRoutes} />
        <AlunoRoute path={"/aluno/app"} component={appRoutes} />
        <Route path="/" component={homeRoutes} />
      </Switch>
    </div>
  );
};

export default AlunoRouter;
