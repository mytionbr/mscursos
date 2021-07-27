
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from './components/core/Menu'
import  Home  from './screens/Home'

const MainRouter = () => {
    return(
        <div>
            <Menu />
            <Switch> 
                <Route exact path="/" component={Home}/>
            </Switch>
        </div>
    )
}

export default MainRouter