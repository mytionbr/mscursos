import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AlunoRouter from './routers/AlunoRouter'
import ProfessorRouter from './routers/ProfessorRouter'
const MainRouter = () => {
    return(
            <Switch> 
                <Route path="/professor" component={ProfessorRouter}/>
                <Route  path={['/','/aluno']} component={AlunoRouter}/>
            </Switch>
    )
}

export default MainRouter