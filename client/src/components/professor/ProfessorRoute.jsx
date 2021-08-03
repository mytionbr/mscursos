import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

function ProfessorRoute({component: Component, ...rest}) {
    const professorSignin = useSelector((state) => state.professorSignin)
    const { professorInfo } = professorSignin

    return (
        <Route
            {...rest}
            render={(props) =>
                professorInfo ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to="/professor/signin"/>
                ) 
            }
        ></Route>
    )
}

export default ProfessorRoute
