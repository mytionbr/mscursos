
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from '../components/core/Navbar/Navbar'
import AlunoPlans from '../screens/Aluno/AlunoPlans/AlunoPlans'
import  Home  from '../screens/Aluno/Home'
import SigninAluno from '../screens/Aluno/SigninAluno/SigninAluno'

const AlunoRouter = () => {
    return(
        <div>
            <Navbar />
            <Switch> 
                <Route exact path="/" component={Home}/>
                <Route exact path="/aluno/signin" component={SigninAluno}/>
                <Route exact path="/aluno/matriculas" component={AlunoPlans}/>
            </Switch>
        </div>
    )
}

export default AlunoRouter