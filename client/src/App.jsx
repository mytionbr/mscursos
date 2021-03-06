import React from 'react'
import MainRouter from './MainRouter'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import { CssBaseline } from '@material-ui/core'

const App = () => {
  
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <MainRouter/>
            </ThemeProvider>
        </Router>
    )
} 

export default App