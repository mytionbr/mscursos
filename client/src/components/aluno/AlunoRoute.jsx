import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

function AlunoRoute({component: Component, ...rest}) {
    const alunoSignin = useSelector((state) => state.alunoSignin)
    const { alunoInfo } = alunoSignin
    
    return (
        <Route
            {...rest}
            render={(props) =>
                alunoInfo  ? (
                    <Component {...props}></Component>
                   
                ) : (
                    <Redirect to="/aluno/signin"/>
                ) 
            }
        ></Route>
    )
}

export default AlunoRoute
