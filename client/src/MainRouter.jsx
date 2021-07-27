
import { Box } from '@material-ui/core'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from './components/core/Navbar/Navbar'
import  Home  from './screens/Home'

const MainRouter = () => {
    return(
        <div>
            <Box width="100vw" height="100%" bgcolor="primary.light">
                <Menu />
                <Switch> 
                    <Route exact path="/" component={Home}/>
                </Switch>
            </Box>
        </div>
    )
}

export default MainRouter