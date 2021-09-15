import { Link } from 'react-router-dom'
import React from 'react'
import useStyles from './styles'
function LinkPerfil({alunoId, children}) {
    const classes = useStyles()
    return (
        <div>
            <Link className={classes.link} to={`/aluno/app/perfil/${alunoId}`}>
                {children}
            </Link>
        </div>
    )
}

export default LinkPerfil
