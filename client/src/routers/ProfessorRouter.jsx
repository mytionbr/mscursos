import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SigninProfessor from '../screens/Professor/SigninProfessor/SigninProfessor'

const MainRouter = () => {
    return(
        <div>
                <Switch> 
                    <Route  path={['/professor','/professor/signin']} component={SigninProfessor}/>
                </Switch>
        </div>
    )
}

export default MainRouter