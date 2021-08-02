import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DashboardLayout from '../components/professor/dashboard/dashboardLayout'
import Dashboard from '../screens/Professor/Dashboard'
import SigninProfessor from '../screens/Professor/SigninProfessor/SigninProfessor'

const MainRouter = () => {
    return(
        <div>
            <Switch> 
                <Route  
                    path={'/professor/app'} 
                    element={<DashboardLayout/>}
                    children={[
                        {path: 'dashboard', element: <Dashboard/>}
                    ]}
                />
                <Route  path={['/professor','/professor/signin']} component={SigninProfessor}/>
            </Switch>
        </div>
    )
}

export default MainRouter