import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SigninProfessor from '../screens/SigninProfessor/SigninProfessor'

const MainRouter = () => {
    return(
        <div>
            <div>
                <Switch> 
                    <Route  path={['/professor','/professor/signin']} component={SigninProfessor}/>
                </Switch>
            </div>
        </div>
    )
}

export default MainRouter