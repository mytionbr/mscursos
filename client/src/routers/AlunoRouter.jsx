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
const AlunoRouter = () => {
  
  const appRoutes = () => {
    return (
      <DashboardLayout>
        <Switch>
          <AlunoRoute path={"/aluno/app/curso/:cursoSlug"} component={CursoPage} />
          <AlunoRoute path={"/aluno/app"} component={Dashboard} />
        </Switch>
      </DashboardLayout>
    );
  };

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
        <AlunoRoute path={"/aluno/app"} component={appRoutes} />
        <Route path="/" component={homeRoutes} />
      </Switch>
    </div>
  );
};

export default AlunoRouter;
