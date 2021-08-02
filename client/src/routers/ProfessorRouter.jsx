import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../screens/Professor/Dashboard'
import SigninProfessor from '../screens/Professor/SigninProfessor/SigninProfessor'

const MainRouter = () => {
    return(
        <div>
                <Switch> 
                    <Route  path={['/professor','/professor/signin']} component={SigninProfessor}/>
                    <Route exact path={'/professor/dashboard'} component={Dashboard}/>
                </Switch>
        </div>
    )
}

export default MainRouter