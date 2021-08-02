
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from '../components/core/Navbar/Navbar'
import  Home  from '../screens/Home'
import SigninAluno from '../screens/SigninAluno/SigninAluno'

const AlunoRouter = () => {
    return(
        <div>
            <div>
                <Navbar />
                <Switch> 
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/aluno/signin" component={SigninAluno}/>
                </Switch>
            </div>
        </div>
    )
}

export default AlunoRouter