import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DashboardLayout from '../components/professor/dashboard/DashboardLayout/DashboardLayout'
import Dashboard from '../screens/Professor/Dashboard'
import SigninProfessor from '../screens/Professor/SigninProfessor/SigninProfessor'
import ProfessorRoute from '../components/professor/ProfessorRoute'
import CursoList from '../screens/Professor/curso/CursoList/CursoList'
import CreateCurso from '../screens/Professor/curso/CreateCurso/CreateCurso'
import UpdateCurso from '../screens/Professor/curso/UpdateCurso/UpdateCurso'
import CreateAula from '../screens/Professor/aula/CreateAula/CreateAula'
import UpdateAula from '../screens/Professor/aula/UpdateAula/UpdateAula'
import AulaListResult from '../components/professor/aulaList/AulaListResult/AulaListResult'
import AulaList from '../screens/Professor/aula/AulaList/AulaList'

const ProfessorRouter = () => {
    const routes = ()=>{
        return (
                <DashboardLayout>
                     <Switch>
                        <ProfessorRoute 
                            path={'/professor/app/aulas/novo'} 
                            component={ CreateAula}
                        />
                        <ProfessorRoute 
                            path={'/professor/app/cursos/:cursoId/aulas/:aulaId'} 
                            component={ UpdateAula}
                        />
                        <ProfessorRoute 
                            path={'/professor/app/cursos/novo'} 
                            component={ CreateCurso}
                        />
                         <ProfessorRoute 
                            path={'/professor/app/cursos/:cursoId'} 
                            component={ UpdateCurso}
                        />
                         <ProfessorRoute 
                            exact 
                            path={
                                '/professor/app/cursos'} 
                            component={ CursoList}
                        />
                        <ProfessorRoute 
                            exact 
                            path={
                                '/professor/app/aulas'} 
                            component={ AulaList}
                        />


                        <ProfessorRoute 
                            path={[
                                '/professor/app/dashboard',
                                '/professor/app/']} 
                            component={ Dashboard}
                        />
                       
                     </Switch> 
                   </DashboardLayout>            
        )
    }
    
    return(
        <div>
            <Switch> 
                <ProfessorRoute  path={'/professor/app'} component={routes}/>
                <Route  path={['/professor','/professor/signin']} component={SigninProfessor}/>
            </Switch>
        </div>
    )
}

export default ProfessorRouter