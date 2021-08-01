
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/core/Navbar/Navbar'
import  Home  from './screens/Home'
import SigninProfessor from './screens/SigninProfessor/SigninProfessor'
import SigninAluno from './screens/SigninAluno/SigninAluno'

const MainRouter = () => {
    return(
        <div>
            <div>
                <Navbar />
                <Switch> 
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/aluno/signin" component={SigninAluno}/>
                    <Route exact path="/professor/signin" component={SigninProfessor}/>
                </Switch>
            </div>
        </div>
    )
}

export default MainRouter