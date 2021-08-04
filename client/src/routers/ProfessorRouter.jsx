import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DashboardLayout from '../components/professor/dashboard/DashboardLayout/DashboardLayout'
import Dashboard from '../screens/Professor/Dashboard'
import SigninProfessor from '../screens/Professor/SigninProfessor/SigninProfessor'
import ProfessorRoute from '../components/professor/ProfessorRoute'
import CursoList from '../screens/Professor/CursoList/CursoList'

const ProfessorRouter = () => {
    const routes = ()=>{
        return (
                <DashboardLayout>
                     <Switch>
                         <ProfessorRoute 
                            exact 
                            path={
                                '/professor/app/cursos'} 
                            component={ CursoList}
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