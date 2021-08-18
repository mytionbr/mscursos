import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from '../components/core/Navbar/Navbar'
import AlunoPlans from '../screens/Aluno/AlunoPlans/AlunoPlans'
import  Home  from '../screens/Aluno/Home'
import RegisterInfoMatricula from '../screens/Aluno/Matricula/RegisterInfoMatricula'
import SigninAluno from '../screens/Aluno/SigninAluno/SigninAluno'
import DashboardLayout from '../components/aluno/dashboard/DashboardLayout/DashboardLayout'
import AlunoRoute from '../components/aluno/AlunoRoute'
const AlunoRouter = () => {
    
    const routes = () => {
        return (
          <DashboardLayout>
            <Switch>
                <div>Oi</div>
            </Switch>
          </DashboardLayout>
        );
      };

    return(
        <div>
            <Navbar />
            <Switch> 
                <AlunoRoute path={"/aluno/app"} component={routes} />
                <Route exact path="/" component={Home}/>
                <Route exact path="/aluno/signin" component={SigninAluno}/>
                <Route exact path="/aluno/matriculas" component={AlunoPlans}/>
                <Route path="/aluno/matriculas/compra/:plano" component={RegisterInfoMatricula}/>
            </Switch>
        </div>
    )
}

export default AlunoRouter