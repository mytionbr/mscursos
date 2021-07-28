
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/core/Navbar/Navbar'
import  Home  from './screens/Home'

const MainRouter = () => {
    return(
        <div>
            <div>
                <Navbar />
                <Switch> 
                    <Route exact path="/" component={Home}/>
                </Switch>
            </div>
        </div>
    )
}

export default MainRouter