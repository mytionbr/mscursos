import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DashboardLayout from '../components/professor/dashboard/DashboardLayout/DashboardLayout'
import Dashboard from '../screens/Professor/Dashboard'
import SigninProfessor from '../screens/Professor/SigninProfessor/SigninProfessor'

const MainRouter = () => {
    return(
        <div>
            <Switch> 

                <DashboardLayout>
                    <Switch> 
                        <Route  
                            path={'/professor/app'} 
                            component={ Dashboard}
                        />
                        </Switch>
                </DashboardLayout>
               
                <Route  path={['/professor','/professor/signin']} component={SigninProfessor}/>
            </Switch>
        </div>
    )
}

export default MainRouter